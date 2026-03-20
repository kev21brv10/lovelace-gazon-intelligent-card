from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
SRC_MAIN = ROOT / "gazon-intelligent-card.js"
SRC_CARD_STYLES = ROOT / "card-styles.js"
SRC_EDITOR_STYLES = ROOT / "editor-styles.js"
DIST_DIR = ROOT / "dist"
DIST_MAIN = DIST_DIR / "gazon-intelligent-card.js"

card_styles = SRC_CARD_STYLES.read_text(encoding="utf-8").split("`", 1)[1].rsplit("`;", 1)[0]
editor_styles = SRC_EDITOR_STYLES.read_text(encoding="utf-8").split("`", 1)[1].rsplit("`;", 1)[0]
main = SRC_MAIN.read_text(encoding="utf-8")

lines = main.splitlines(keepends=True)
if not lines[0].startswith('import { CARD_STYLES } from "./card-styles.js";'):
    raise SystemExit("gazon-intelligent-card.js must import CARD_STYLES first")
if not lines[1].startswith('import { EDITOR_STYLES } from "./editor-styles.js";'):
    raise SystemExit("gazon-intelligent-card.js must import EDITOR_STYLES second")

main = "".join(lines[2:])
bundle = (
    "const CARD_STYLES = String.raw`"
    + card_styles
    + "`;\n"
    + "const EDITOR_STYLES = String.raw`"
    + editor_styles
    + "`;\n\n"
    + main
)

if DIST_DIR.exists():
    shutil.rmtree(DIST_DIR)
DIST_DIR.mkdir(parents=True, exist_ok=True)
DIST_MAIN.write_text(bundle, encoding="utf-8")

print(f"Built {DIST_MAIN.relative_to(ROOT)}")
