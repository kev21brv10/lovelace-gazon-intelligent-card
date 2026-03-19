from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "gazon-intelligent-card.js"
DIST = ROOT / "dist" / "gazon-intelligent-card.js"

DIST.parent.mkdir(parents=True, exist_ok=True)
shutil.copyfile(SRC, DIST)
print(f"Built {DIST.relative_to(ROOT)}")
