from pathlib import Path
import gzip

ROOT     = Path(__file__).resolve().parents[1]
SRC      = ROOT / "src" / "gazon-intelligent-card.js"
DIST     = ROOT / "gazon-intelligent-card.js"
DIST_GZ  = ROOT / "gazon-intelligent-card.js.gz"

content = SRC.read_text(encoding="utf-8")
DIST.write_text(content, encoding="utf-8")
DIST_GZ.write_bytes(gzip.compress(content.encode("utf-8"), mtime=0))
print(f"Built {DIST.relative_to(ROOT)}  ({len(content):,} chars)")
