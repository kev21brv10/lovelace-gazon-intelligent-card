from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
hacs = json.loads((ROOT / "hacs.json").read_text(encoding="utf-8"))

if package.get("main") != "dist/gazon-intelligent-card.js":
    raise SystemExit("package.json main must point to dist/gazon-intelligent-card.js")

if hacs.get("filename") != "dist/gazon-intelligent-card.js":
    raise SystemExit("hacs.json filename must point to dist/gazon-intelligent-card.js")

if hacs.get("content_in_root") is not False:
    raise SystemExit("hacs.json content_in_root must be false")

src = (ROOT / "gazon-intelligent-card.js").read_text(encoding="utf-8")
dist = (ROOT / "dist" / "gazon-intelligent-card.js").read_text(encoding="utf-8")

if src != dist:
    raise SystemExit("dist/gazon-intelligent-card.js does not match gazon-intelligent-card.js")

for marker in ("customElements.define", "getConfigForm", "window.customCards"):
    if marker not in src:
        raise SystemExit(f"Missing expected marker: {marker}")

print("Validation OK")
