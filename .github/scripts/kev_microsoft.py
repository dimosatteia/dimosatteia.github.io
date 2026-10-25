#!/usr/bin/env python3
"""Φιλτράρει τον κατάλογο CISA KEV για Microsoft και γράφει το data/kev_microsoft.json.

Πηγή: cisagov/kev-data (επίσημο mirror της CISA στο GitHub, άδεια CC0 1.0).
CVSS: από την εγγραφή κάθε CVE στο CVE List (CVEProject/cvelistV5 στο GitHub). Πρώτα η βαθμολογία του CNA,
δηλαδή της Microsoft, και αν λείπει, του CISA ADP (Vulnrichment). Οι παλιές βαθμολογίες κρατιούνται από το
προηγούμενο αρχείο, ώστε κάθε run να ζητά μόνο τα CVE που δεν έχουν ακόμη.
Χρήση: python3 kev_microsoft.py <known_exploited_vulnerabilities.json> <data/kev_microsoft.json>
"""
import json
import os
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from collections import Counter
from datetime import date, datetime, timedelta, timezone

src, dst = sys.argv[1], sys.argv[2]

with open(src, encoding="utf-8") as f:
    catalog = json.load(f)

vulns = catalog.get("vulnerabilities", [])
if len(vulns) < 1000:
    # Προστασία: αν το feed έρθει κομμένο ή άδειο, δεν γράφουμε τίποτα.
    sys.exit(f"Ύποπτα μικρός κατάλογος ({len(vulns)} εγγραφές), δεν ενημερώνω.")

ms = [v for v in vulns if v.get("vendorProject", "").strip().lower() == "microsoft"]
ms.sort(key=lambda v: (v.get("dateAdded", ""), v.get("cveID", "")), reverse=True)

today = date.today()


def days_since(d):
    try:
        return (today - date.fromisoformat(d)).days
    except ValueError:
        return 10**6


def msrc_link(v):
    m = re.search(r"https://msrc\.microsoft\.com/\S+", v.get("notes", ""))
    if m:
        return m.group(0).rstrip(";, ")
    return f"https://msrc.microsoft.com/update-guide/vulnerability/{v['cveID']}"


items = [
    {
        "cve": v["cveID"],
        "product": v.get("product", "").strip(),
        "name": v.get("vulnerabilityName", "").strip(),
        "added": v.get("dateAdded", ""),
        "due": v.get("dueDate", ""),
        "ransomware": v.get("knownRansomwareCampaignUse", "Unknown") == "Known",
        "desc": v.get("shortDescription", "").strip(),
        "cwes": v.get("cwes", []),
        "msrc": msrc_link(v),
    }
    for v in ms
]

# ---------- CVSS ----------
CVELIST = "https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/{y}/{b}xxx/{cve}.json"
# Σειρά προτίμησης: η έκδοση 3.1 είναι αυτή που δημοσιεύει η Microsoft και τη βλέπει κανείς στο MSRC.
KEYS = [("cvssV3_1", "3.1"), ("cvssV3_0", "3.0"), ("cvssV4_0", "4.0"), ("cvssV2_0", "2.0")]


def pick(metrics):
    for key, ver in KEYS:
        for m in metrics or []:
            c = m.get(key)
            if c and isinstance(c.get("baseScore"), (int, float)):
                sev = (c.get("baseSeverity") or "").upper()
                return {"v": ver, "score": float(c["baseScore"]), "sev": sev, "vector": c.get("vectorString", "")}
    return None


def fetch_cvss(cve):
    try:
        _, y, n = cve.split("-")
        url = CVELIST.format(y=y, b=int(n) // 1000, cve=cve)
        with urllib.request.urlopen(url, timeout=30) as r:
            rec = json.load(r)
    except Exception:
        return None
    cont = rec.get("containers", {})
    got = pick(cont.get("cna", {}).get("metrics"))
    if got:
        got["by"] = "CNA"
        return got
    for adp in cont.get("adp", []):
        got = pick(adp.get("metrics"))
        if got:
            got["by"] = (adp.get("providerMetadata") or {}).get("shortName", "ADP")
            return got
    return None


def severity(score):
    # Κλίμακα του NVD για CVSS v3.x και v4.0
    if score >= 9.0:
        return "CRITICAL"
    if score >= 7.0:
        return "HIGH"
    if score >= 4.0:
        return "MEDIUM"
    if score > 0:
        return "LOW"
    return "NONE"


old_cvss = {}
if os.path.exists(dst):
    try:
        with open(dst, encoding="utf-8") as f:
            old_cvss = {i["cve"]: i["cvss"] for i in json.load(f).get("items", []) if i.get("cvss")}
    except (ValueError, KeyError):
        old_cvss = {}

missing = [i["cve"] for i in items if i["cve"] not in old_cvss]
with ThreadPoolExecutor(max_workers=8) as ex:
    fresh = dict(zip(missing, ex.map(fetch_cvss, missing)))
for i in items:
    c = old_cvss.get(i["cve"]) or fresh.get(i["cve"])
    if c:
        if not c.get("sev") or c["v"] == "2.0":
            c["sev"] = severity(c["score"]) if c["v"] != "2.0" else ("HIGH" if c["score"] >= 7 else "MEDIUM" if c["score"] >= 4 else "LOW")
        i["cvss"] = c

products = Counter(i["product"] for i in items)

out = {
    "source": "https://github.com/cisagov/kev-data",
    "catalog": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog?f%5B0%5D=vendor_project%3A822",
    "license": "CC0 1.0",
    "catalogVersion": catalog.get("catalogVersion", ""),
    "dateReleased": catalog.get("dateReleased", ""),
    "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "totalAll": len(vulns),
    "totalMicrosoft": len(items),
    "ransomwareKnown": sum(i["ransomware"] for i in items),
    "added30": sum(days_since(i["added"]) <= 30 for i in items),
    "added90": sum(days_since(i["added"]) <= 90 for i in items),
    "addedThisYear": sum(i["added"].startswith(str(today.year)) for i in items),
    "cvssSource": "https://github.com/CVEProject/cvelistV5",
    "withCvss": sum(1 for i in items if i.get("cvss")),
    "products": [{"name": n, "count": c} for n, c in products.most_common()],
    "items": items,
}

with open(dst, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")

print(f"KEV {out['catalogVersion']}: {out['totalMicrosoft']} Microsoft από {out['totalAll']}, {out['withCvss']} με CVSS ({len(missing)} νέα αιτήματα)")
