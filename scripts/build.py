from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
SRC_MAIN = ROOT / "src" / "gazon-intelligent-card.js"
SRC_LAYOUT = ROOT / "src" / "renderers" / "layout.js"
SRC_EDITOR = ROOT / "src" / "editor" / "editor.js"
SRC_CARD_STYLES = ROOT / "src" / "styles" / "card-styles.js"
SRC_EDITOR_STYLES = ROOT / "src" / "styles" / "editor-styles.js"
DIST_DIR = ROOT / "dist"
DIST_MAIN = DIST_DIR / "gazon-intelligent-card.js"

def strip_module_source(text: str) -> str:
    lines = []
    skipping_import = False
    for line in text.splitlines(keepends=True):
        if skipping_import:
            if ";" in line:
                skipping_import = False
            continue
        if line.lstrip().startswith("import "):
            if ";" not in line:
                skipping_import = True
            continue
        if line.startswith("export "):
            lines.append(line[len("export "):])
        else:
            lines.append(line)
    return "".join(lines)

card_styles = SRC_CARD_STYLES.read_text(encoding="utf-8").split("`", 1)[1].rsplit("`;", 1)[0]
editor_styles = SRC_EDITOR_STYLES.read_text(encoding="utf-8").split("`", 1)[1].rsplit("`;", 1)[0]
main = strip_module_source(SRC_MAIN.read_text(encoding="utf-8"))
layout = strip_module_source(SRC_LAYOUT.read_text(encoding="utf-8"))
editor = strip_module_source(SRC_EDITOR.read_text(encoding="utf-8"))

bundle = (
    "const CARD_STYLES = String.raw`"
    + card_styles
    + "`;\n"
    + "const EDITOR_STYLES = String.raw`"
    + editor_styles
    + "`;\n\n"
    + main
    + "\n\n"
    + layout
    + "\n\n"
    + editor
)

if DIST_DIR.exists():
    shutil.rmtree(DIST_DIR)
DIST_DIR.mkdir(parents=True, exist_ok=True)
DIST_MAIN.write_text(bundle, encoding="utf-8")

print(f"Built {DIST_MAIN.relative_to(ROOT)}")
