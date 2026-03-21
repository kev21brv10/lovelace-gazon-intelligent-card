from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]

package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
hacs = json.loads((ROOT / "hacs.json").read_text(encoding="utf-8"))
SRC_FILES = [
    "src/constants.js",
    "src/utils/formatters.js",
    "src/renderers/primitives.js",
    "src/editor/editor.js",
    "src/gazon-intelligent-card.js",
    "src/renderers/layout.js",
    "src/styles/card-styles.js",
    "src/styles/editor-styles.js",
]
DIST_FILE = "gazon-intelligent-card.js"

src_files = {name: (ROOT / name).read_text(encoding="utf-8") for name in SRC_FILES}
root_bundle = ROOT / "gazon-intelligent-card.js"
root_src = root_bundle.read_text(encoding="utf-8")
readme = (ROOT / "README.md").read_text(encoding="utf-8")

if package.get("main") != "gazon-intelligent-card.js":
    raise SystemExit("package.json main must point to gazon-intelligent-card.js")

if hacs.get("filename") != "gazon-intelligent-card.js":
    raise SystemExit("hacs.json filename must point to gazon-intelligent-card.js")

if hacs.get("content_in_root") is not True:
    raise SystemExit("hacs.json content_in_root must be true")

main_src = src_files["src/gazon-intelligent-card.js"]
constants_src = src_files["src/constants.js"]
version_match = re.search(r'CARD_VERSION\s*=\s*"([^"]+)"', main_src)
if not version_match:
    raise SystemExit("Could not find CARD_VERSION in src/gazon-intelligent-card.js")

if version_match.group(1) != package.get("version"):
    raise SystemExit("CARD_VERSION must match package.json version")

constants_version_match = re.search(r'CARD_VERSION\s*=\s*"([^"]+)"', constants_src)
if not constants_version_match:
    raise SystemExit("Could not find CARD_VERSION in src/constants.js")

if constants_version_match.group(1) != package.get("version"):
    raise SystemExit("CARD_VERSION in src/constants.js must match package.json version")

if 'import { CARD_STYLES } from "./card-styles.js";' in root_src:
    raise SystemExit("gazon-intelligent-card.js must not import CARD_STYLES")

if 'import { EDITOR_STYLES } from "./editor-styles.js";' in root_src:
    raise SystemExit("gazon-intelligent-card.js must not import EDITOR_STYLES")

for marker in ("const CARD_STYLES = String.raw`", "const EDITOR_STYLES = String.raw`"):
    if marker not in root_src:
        raise SystemExit(f"gazon-intelligent-card.js must inline {marker}")

dist_dir = ROOT / "dist"
if dist_dir.exists():
    dist_entries = [p.name for p in dist_dir.iterdir() if p.is_file()]
    if dist_entries:
        raise SystemExit("dist/ must be empty when publishing gazon-intelligent-card.js at root")

if "/local/gazon-intelligent-card/gazon-intelligent-card.js" not in readme:
    raise SystemExit("README.md must document the local Lovelace resource path")

if 'import { CARD_STYLES } from "./styles/card-styles.js";' not in main_src:
    raise SystemExit('Missing CARD_STYLES import in src/gazon-intelligent-card.js')

if 'from "./renderers/layout.js";' not in main_src:
    raise SystemExit("src/gazon-intelligent-card.js must import the layout renderer module")

editor_src = src_files["src/editor/editor.js"]
for marker in (
    'import { CARD_TYPE, DEFAULT_CONFIG } from "../constants.js";',
    'import { EDITOR_STYLES } from "../styles/editor-styles.js";',
    "GazonIntelligentCardEditor",
    'customElements.define(`${CARD_TYPE}-editor`',
):
    if marker not in editor_src:
        raise SystemExit(f"Missing expected marker in src/editor/editor.js: {marker}")

layout_src = src_files["src/renderers/layout.js"]
for marker in ("renderHeader", "renderDecisionLayout", "renderWateringProgressSection"):
    if marker not in layout_src:
        raise SystemExit(f"Missing expected marker in src/renderers/layout.js: {marker}")

primitives_src = src_files["src/renderers/primitives.js"]
for marker in ("renderPill", "renderCardCore", "renderStatusPill"):
    if marker not in primitives_src:
        raise SystemExit(f"Missing expected marker in src/renderers/primitives.js: {marker}")

formatters_src = src_files["src/utils/formatters.js"]
for marker in ("formatDurationHuman", "humanDateTimeText", "normalizeConfig"):
    if marker not in formatters_src:
        raise SystemExit(f"Missing expected marker in src/utils/formatters.js: {marker}")

constants_markers = ("SECTION_DEFS", "TAB_DEFS", "STATUS_COLORS")
for marker in constants_markers:
    if marker not in constants_src:
        raise SystemExit(f"Missing expected marker in src/constants.js: {marker}")

for marker in ("customElements.define", "getConfigForm", "window.customCards"):
    if marker not in main_src:
        raise SystemExit(f"Missing expected marker: {marker}")

print("Validation OK")
