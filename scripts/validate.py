from pathlib import Path
import gzip
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
DIST_GZ_FILE = "gazon-intelligent-card.js.gz"
CRITICAL_HELPERS = (
    "formatInterventionStatusPresentation",
    "formatPostApplicationStatusPresentation",
    "formatWateringBlockReason",
    "safeRenderIconBox",
    "safeRenderStatusPill",
    "safeFormatMonthLabel",
    "safeFormatWeatherConditionLabel",
)

UNIQUE_HELPERS = (
    "isEmpty",
    "isUnavailableState",
    "escapeHtml",
    "asNumber",
    "formatNumber",
    "formatDurationHuman",
    "iconForField",
    "renderIconBox",
    "renderStatusPill",
    "formatInterventionStatusPresentation",
    "formatPostApplicationStatusPresentation",
    "formatWateringBlockReason",
    "formatMonthLabel",
    "formatProductUsageMode",
    "formatProductAnnualLimit",
    "safeRenderIconBox",
    "safeRenderStatusPill",
    "safeFormatMonthLabel",
    "safeFormatWeatherConditionLabel",
)

UNIQUE_CONSTANTS = (
    "CARD_TYPE",
    "CARD_NAME",
    "CARD_VERSION",
    "DEFAULT_CONFIG",
    "TAB_DEFS",
    "SECTION_DEFS",
    "ENTITY_KEYS",
    "RENDER_SIGNATURE_ATTRS",
    "STATUS_COLORS",
    "STATUS_LABELS",
    "WEATHER_LABELS",
)

src_files = {name: (ROOT / name).read_text(encoding="utf-8") for name in SRC_FILES}
root_bundle = ROOT / "gazon-intelligent-card.js"
root_bundle_gz = ROOT / DIST_GZ_FILE
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
if 'from "./constants.js"' not in main_src:
    raise SystemExit('src/gazon-intelligent-card.js must import shared constants')

if 'const CARD_VERSION =' in main_src:
    raise SystemExit("src/gazon-intelligent-card.js must not define CARD_VERSION locally")

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

if not root_bundle.exists():
    raise SystemExit("gazon-intelligent-card.js must exist at repo root")

if not root_bundle_gz.exists():
    raise SystemExit("gazon-intelligent-card.js.gz must exist at repo root")

try:
    gz_text = gzip.decompress(root_bundle_gz.read_bytes()).decode("utf-8")
except Exception as exc:  # pragma: no cover - defensive validation
    raise SystemExit(f"gazon-intelligent-card.js.gz must be a valid gzip bundle: {exc}") from exc

if gz_text != root_src:
    raise SystemExit("gazon-intelligent-card.js.gz must decompress to gazon-intelligent-card.js")

if "/local/gazon-intelligent-card/gazon-intelligent-card.js" not in readme:
    raise SystemExit("README.md must document the local Lovelace resource path")

if 'import { CARD_STYLES } from "./styles/card-styles.js";' not in main_src:
    raise SystemExit('Missing CARD_STYLES import in src/gazon-intelligent-card.js')

if 'from "./constants.js"' not in main_src:
    raise SystemExit('Missing constants import in src/gazon-intelligent-card.js')

for marker in (
    "const CARD_TYPE =",
    "const CARD_NAME =",
    "const CARD_VERSION =",
    "const DEFAULT_CONFIG =",
    "const TAB_DEFS =",
    "const SECTION_DEFS =",
    "const ENTITY_KEYS =",
    "const RENDER_SIGNATURE_ATTRS =",
    "const STATUS_COLORS =",
    "const STATUS_LABELS =",
):
    if marker in main_src:
        raise SystemExit(f"src/gazon-intelligent-card.js must not define {marker}")

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

required_safe_imports = {
    "src/gazon-intelligent-card.js": (
        "safeRenderIconBox as renderIconBox",
        "safeRenderStatusPill as renderStatusPill",
        "safeFormatWeatherConditionLabel as formatWeatherConditionLabel",
    ),
    "src/renderers/layout.js": (
        "safeFormatMonthLabel as formatMonthLabel",
        "safeRenderIconBox as renderIconBox",
        "safeRenderStatusPill as renderStatusPill",
    ),
    "src/renderers/primitives.js": (
        "safeRenderIconBox",
    ),
}

for source_name, markers in required_safe_imports.items():
    source_text = src_files[source_name]
    for marker in markers:
        if marker not in source_text:
            raise SystemExit(f"{source_name} must import {marker}")

for marker in (
    "function formatProductUsageMode",
    "function formatProductAnnualLimit",
    "function formatTemperatureRangeConstraint",
    "function formatMonthLabel",
    "function iconForField",
):
    if marker not in root_src:
        raise SystemExit(f"Missing expected helper in bundled file: {marker}")

for marker in CRITICAL_HELPERS:
    helper_marker = f"function {marker}"
    if helper_marker not in root_src:
        raise SystemExit(f"Missing critical helper in bundled file: {helper_marker}")

for helper in UNIQUE_HELPERS:
    occurrences = len(re.findall(rf"(?m)^function\s+{re.escape(helper)}\s*\(", root_src))
    if occurrences != 1:
        raise SystemExit(f"Bundled helper {helper} must be defined exactly once (found {occurrences})")

for constant in UNIQUE_CONSTANTS:
    occurrences = len(re.findall(rf"(?m)^const\s+{re.escape(constant)}\s*=", root_src))
    if occurrences != 1:
        raise SystemExit(f"Bundled constant {constant} must be defined exactly once (found {occurrences})")

for marker in (
    "sensor.gazon_intelligent_niveau_de_pertinence",
    "sensor.gazon_intelligent_prochaine_fenetre_optimale",
    "sensor.gazon_intelligent_prochain_blocage_attendu",
    "binary_sensor.gazon_intelligent_signal_intervention",
    "binary_sensor.gazon_intelligent_signal_irrigation",
):
    if marker not in root_src:
        raise SystemExit(f"Missing derived entity reference in bundled file: {marker}")

print("Validation OK")
