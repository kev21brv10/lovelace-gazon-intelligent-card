from pathlib import Path
import gzip

ROOT     = Path(__file__).resolve().parents[1]
SRC      = ROOT / "src" / "gazon-intelligent-card.js"
DIST     = ROOT / "gazon-intelligent-card.js"
DIST_GZ  = ROOT / "gazon-intelligent-card.js.gz"

import json, re

VERSION = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))["version"]

content = SRC.read_text(encoding="utf-8")

# ⚠️ LA VERSION AFFICHÉE EN RÉGLAGES VIENT D'ICI, PAS D'UNE CONSTANTE ÉCRITE À LA MAIN.
# Le commentaire de la source affirmait déjà que ce script la tenait à jour — c'était faux :
# `GI_VERSION` est restée figée à 0.26.0 pendant les 0.26.1, 0.26.2 et 0.26.3. Or c'est
# précisément l'endroit où l'on va vérifier quelle version le navigateur a réellement
# chargée après avoir vidé son cache. Une version qui ment y est pire que pas de version.
content, n = re.subn(r"const GI_VERSION = '[^']*';", f"const GI_VERSION = '{VERSION}';", content, count=1)
if n != 1:
    raise SystemExit("build: GI_VERSION introuvable dans la source — la version ne serait pas injectée")
if content != SRC.read_text(encoding="utf-8"):
    SRC.write_text(content, encoding="utf-8")   # la source reste la vérité lisible
DIST.write_text(content, encoding="utf-8")
DIST_GZ.write_bytes(gzip.compress(content.encode("utf-8"), mtime=0))
print(f"Built {DIST.relative_to(ROOT)}  ({len(content):,} chars)")
