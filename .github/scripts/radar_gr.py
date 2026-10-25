#!/usr/bin/env python3
"""Διαβάζει από το Cloudflare Radar API τις επιθέσεις Layer 3/4 (DDoS) προς την Ελλάδα για τις
τελευταίες 24 ώρες και γράφει το data/radar_gr.json για τη σελίδα /cloudflare-radar/.

Άδεια δεδομένων Radar API: CC BY-NC 4.0 (απαιτείται αναφορά πηγής, μόνο μη εμπορική χρήση).
Το token διαβάζεται από τη μεταβλητή CLOUDFLARE_RADAR_TOKEN (GitHub secret, μόνο Radar: Read).
Χρήση: python3 radar_gr.py data/radar_gr.json
       python3 radar_gr.py data/radar_gr.json <φάκελος>   (τοπική δοκιμή από vector/vertical/origin/timeseries.json)
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

dst = sys.argv[1]
offline = sys.argv[2] if len(sys.argv) > 2 else None
token = os.environ.get("CLOUDFLARE_RADAR_TOKEN", "").strip()
if not token and not offline:
    sys.exit("Λείπει το CLOUDFLARE_RADAR_TOKEN.")

BASE = "https://api.cloudflare.com/client/v4/radar/attacks/layer3"
Q = "location=GR&dateRange=1d&format=JSON"


def get(key, path):
    if offline:
        with open(os.path.join(offline, f"{key}.json"), encoding="utf-8-sig") as f:
            body = json.load(f)
    else:
        url = f"{BASE}/{path}&{Q}" if "?" in path else f"{BASE}/{path}?{Q}"
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}",
                                                   "User-Agent": "thecybersec.gr radar widget"})
        with urllib.request.urlopen(req, timeout=30) as r:
            body = json.load(r)
    if not body.get("success"):
        sys.exit(f"Σφάλμα Radar API στο {path}: {body.get('errors')}")
    return body["result"]


# direction=TARGET: το location=GR φιλτράρει τον στόχο της επίθεσης. Χωρίς αυτό το Radar φιλτράρει την πηγή,
# δηλαδή το data center της Cloudflare που δέχτηκε την κίνηση. Στο top/locations/origin το location είναι ήδη ο στόχος.
vector = get("vector", "summary/vector?direction=TARGET")
vertical = get("vertical", "top/vertical?limit=5&direction=TARGET")
origin = get("origin", "top/locations/origin?limit=6")
series = get("timeseries", "timeseries?aggInterval=1h&direction=TARGET")

VERTICALS_EL = {
    "Gambling": "Τυχερά παιχνίδια", "Internet and Telecom": "Διαδίκτυο και τηλεπικοινωνίες",
    "Computer and Electronics": "Υπολογιστές και ηλεκτρονικά", "Business and Industry": "Επιχειρήσεις και βιομηχανία",
    "Games": "Παιχνίδια", "Finance": "Χρηματοοικονομικά", "Shopping": "Ηλεκτρονικό εμπόριο",
    "Travel": "Ταξίδια", "News, Media and Publications": "Ειδήσεις και μέσα ενημέρωσης",
    "Law and Government": "Δημόσιος τομέας", "Education": "Εκπαίδευση", "Health": "Υγεία",
    "Arts and Entertainment": "Τέχνες και ψυχαγωγία", "Real Estate": "Ακίνητα", "Science": "Επιστήμη",
    "Sports": "Αθλητισμός", "Autos and Vehicles": "Οχήματα", "Food and Drink": "Τρόφιμα και ποτά",
    "Jobs and Education": "Εργασία και εκπαίδευση", "Beauty and Fitness": "Ομορφιά και γυμναστική",
    "Home and Garden": "Σπίτι και κήπος", "Hobbies and Leisure": "Χόμπι και ελεύθερος χρόνος",
    "People and Society": "Κοινωνία", "Pets and Animals": "Κατοικίδια", "Reference": "Αναφορές",
    "Books and Literature": "Βιβλία", "Online Communities": "Online κοινότητες",
}

COUNTRIES_EL = {
    "AE": "Ηνωμένα Αραβικά Εμιράτα", "AL": "Αλβανία", "AR": "Αργεντινή", "AT": "Αυστρία", "AU": "Αυστραλία",
    "BD": "Μπανγκλαντές", "BE": "Βέλγιο", "BG": "Βουλγαρία", "BR": "Βραζιλία", "CA": "Καναδάς",
    "CH": "Ελβετία", "CL": "Χιλή", "CN": "Κίνα", "CO": "Κολομβία", "CY": "Κύπρος", "CZ": "Τσεχία",
    "DE": "Γερμανία", "DK": "Δανία", "EG": "Αίγυπτος", "ES": "Ισπανία", "FI": "Φινλανδία", "FR": "Γαλλία",
    "GB": "Ηνωμένο Βασίλειο", "GR": "Ελλάδα", "HK": "Χονγκ Κονγκ", "HR": "Κροατία", "HU": "Ουγγαρία",
    "ID": "Ινδονησία", "IE": "Ιρλανδία", "IL": "Ισραήλ", "IN": "Ινδία", "IQ": "Ιράκ", "IR": "Ιράν",
    "IT": "Ιταλία", "JP": "Ιαπωνία", "KE": "Κένυα", "KR": "Νότια Κορέα", "KZ": "Καζακστάν", "LT": "Λιθουανία",
    "LU": "Λουξεμβούργο", "LV": "Λετονία", "MA": "Μαρόκο", "MD": "Μολδαβία", "MK": "Βόρεια Μακεδονία",
    "MX": "Μεξικό", "MY": "Μαλαισία", "NG": "Νιγηρία", "NL": "Ολλανδία", "NO": "Νορβηγία", "NZ": "Νέα Ζηλανδία",
    "PE": "Περού", "PH": "Φιλιππίνες", "PK": "Πακιστάν", "PL": "Πολωνία", "PT": "Πορτογαλία", "RO": "Ρουμανία",
    "RS": "Σερβία", "RU": "Ρωσία", "SA": "Σαουδική Αραβία", "SC": "Σεϋχέλλες", "SE": "Σουηδία", "SG": "Σιγκαπούρη",
    "SI": "Σλοβενία", "SK": "Σλοβακία", "TH": "Ταϊλάνδη", "TR": "Τουρκία", "TW": "Ταϊβάν", "UA": "Ουκρανία",
    "US": "ΗΠΑ", "UZ": "Ουζμπεκιστάν", "VE": "Βενεζουέλα", "VN": "Βιετνάμ", "ZA": "Νότια Αφρική",
}

vectors = [{"name": "Άλλα" if k == "other" else k, "pct": round(float(v), 1)}
           for k, v in vector["summary_0"].items()]
vectors.sort(key=lambda x: (x["name"] == "Άλλα", -x["pct"]))
# Κρατάμε τα 6 μεγαλύτερα και τα υπόλοιπα πάνε στο «Άλλα», για να μένει ευανάγνωστο το widget.
if len(vectors) > 7:
    rest = round(sum(v["pct"] for v in vectors[6:]), 1)
    vectors = vectors[:6] + [{"name": "Άλλα", "pct": rest}]

verticals = [{"name": VERTICALS_EL.get(i["name"], i["name"]), "en": i["name"], "pct": round(float(i["value"]), 1)}
             for i in vertical["top_0"]]

origins = [{"code": i["originCountryAlpha2"], "name": COUNTRIES_EL.get(i["originCountryAlpha2"], i["originCountryName"]),
            "pct": round(float(i["value"]), 1)} for i in origin["top_0"]]

s = series["serie_0"]
points = [{"t": t, "v": round(float(v), 4)} for t, v in zip(s["timestamps"], s["values"])]
peak = max(points, key=lambda p: p["v"]) if points else None

meta = vector["meta"]
out = {
    "source": "https://radar.cloudflare.com/gr",
    "license": "CC BY-NC 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
    "units": "bytes",
    "start": meta["dateRange"][0]["startTime"],
    "end": meta["dateRange"][0]["endTime"],
    "lastUpdated": meta.get("lastUpdated", ""),
    "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "vectors": vectors,
    "verticals": verticals,
    "origins": origins,
    "series": points,
    "peak": peak["t"] if peak else "",
}

if not vectors or not points:
    sys.exit("Κενή απάντηση από το Radar API, δεν ενημερώνω.")

with open(dst, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")

print(f"Radar GR: lastUpdated {out['lastUpdated']}, {len(vectors)} vectors, {len(origins)} origins")
