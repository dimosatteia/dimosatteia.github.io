#!/usr/bin/env python3
"""Φιλτράρει τον κατάλογο CISA KEV για Microsoft και γράφει το data/kev_microsoft.json.

Πηγή: cisagov/kev-data (επίσημο mirror της CISA στο GitHub, άδεια CC0 1.0).
Χρήση: python3 kev_microsoft.py <known_exploited_vulnerabilities.json> <data/kev_microsoft.json>
"""
import json
import re
import sys
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
    "products": [{"name": n, "count": c} for n, c in products.most_common()],
    "items": items,
}

with open(dst, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")

print(f"KEV {out['catalogVersion']}: {out['totalMicrosoft']} Microsoft από {out['totalAll']}")
