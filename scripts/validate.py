from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]

package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
hacs = json.loads((ROOT / "hacs.json").read_text(encoding="utf-8"))
SRC_FILES = [
    "gazon-intelligent-card.js",
    "card-styles.js",
    "editor-styles.js",
]
DIST_FILE = "gazon-intelligent-card.js"

src_files = {name: (ROOT / name).read_text(encoding="utf-8") for name in SRC_FILES}
dist_dir = ROOT / "dist"
dist_files = {name: (dist_dir / name).read_text(encoding="utf-8") for name in [DIST_FILE]}
readme = (ROOT / "README.md").read_text(encoding="utf-8")

if package.get("main") != "dist/gazon-intelligent-card.js":
    raise SystemExit("package.json main must point to dist/gazon-intelligent-card.js")

if hacs.get("filename") != "dist/gazon-intelligent-card.js":
    raise SystemExit("hacs.json filename must point to dist/gazon-intelligent-card.js")

if hacs.get("content_in_root") is not False:
    raise SystemExit("hacs.json content_in_root must be false")

main_src = src_files["gazon-intelligent-card.js"]
dist_src = dist_files[DIST_FILE]

version_match = re.search(r'CARD_VERSION\s*=\s*"([^"]+)"', main_src)
if not version_match:
    raise SystemExit("Could not find CARD_VERSION in gazon-intelligent-card.js")

if version_match.group(1) != package.get("version"):
    raise SystemExit("CARD_VERSION must match package.json version")

if 'import { CARD_STYLES } from "./card-styles.js";' in dist_src:
    raise SystemExit("dist/gazon-intelligent-card.js must not import CARD_STYLES")

if 'import { EDITOR_STYLES } from "./editor-styles.js";' in dist_src:
    raise SystemExit("dist/gazon-intelligent-card.js must not import EDITOR_STYLES")

for marker in ("const CARD_STYLES = String.raw`", "const EDITOR_STYLES = String.raw`"):
    if marker not in dist_src:
        raise SystemExit(f"dist/gazon-intelligent-card.js must inline {marker}")

dist_entries = sorted(p.name for p in dist_dir.iterdir() if p.is_file())
if dist_entries != [DIST_FILE]:
    raise SystemExit("dist/ must contain only gazon-intelligent-card.js")

if "/local/gazon-intelligent-card/gazon-intelligent-card.js" not in readme:
    raise SystemExit("README.md must document the local Lovelace resource path")

if 'import { CARD_STYLES } from "./card-styles.js";' not in main_src:
    raise SystemExit('Missing CARD_STYLES import in gazon-intelligent-card.js')

if 'import { EDITOR_STYLES } from "./editor-styles.js";' not in main_src:
    raise SystemExit('Missing EDITOR_STYLES import in gazon-intelligent-card.js')

for marker in ("customElements.define", "getConfigForm", "window.customCards"):
    if marker not in main_src:
        raise SystemExit(f"Missing expected marker: {marker}")

print("Validation OK")
