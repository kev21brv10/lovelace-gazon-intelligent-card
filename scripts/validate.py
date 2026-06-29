"""Validate the gazon-intelligent-card repository for publication.

Architecture: monolithic single-file card.
  src/gazon-intelligent-card.js  — source of truth
  gazon-intelligent-card.js      — distribution bundle (copy of src)
  gazon-intelligent-card.js.gz   — pre-compressed bundle
"""
from pathlib import Path
import gzip
import json
import re

ROOT = Path(__file__).resolve().parents[1]

# ── Load files ────────────────────────────────────────────────────────────────

package  = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
hacs     = json.loads((ROOT / "hacs.json").read_text(encoding="utf-8"))
src_file = ROOT / "src" / "gazon-intelligent-card.js"
dist_js  = ROOT / "gazon-intelligent-card.js"
dist_gz  = ROOT / "gazon-intelligent-card.js.gz"
readme   = (ROOT / "README.md").read_text(encoding="utf-8")

if not src_file.exists():
    raise SystemExit("src/gazon-intelligent-card.js must exist")
if not dist_js.exists():
    raise SystemExit("gazon-intelligent-card.js must exist at repo root")
if not dist_gz.exists():
    raise SystemExit("gazon-intelligent-card.js.gz must exist at repo root")

src_text  = src_file.read_text(encoding="utf-8")
dist_text = dist_js.read_text(encoding="utf-8")

# ── package.json / hacs.json ──────────────────────────────────────────────────

if package.get("main") != "gazon-intelligent-card.js":
    raise SystemExit("package.json main must point to gazon-intelligent-card.js")

if hacs.get("filename") != "gazon-intelligent-card.js":
    raise SystemExit("hacs.json filename must point to gazon-intelligent-card.js")

if hacs.get("content_in_root") is not True:
    raise SystemExit("hacs.json content_in_root must be true")

if "iot_class" not in hacs:
    raise SystemExit("hacs.json must define iot_class")

# ── Bundle integrity ──────────────────────────────────────────────────────────

if dist_text != src_text:
    raise SystemExit(
        "gazon-intelligent-card.js must be an exact copy of src/gazon-intelligent-card.js — "
        "run: python3 scripts/build.py"
    )

try:
    gz_text = gzip.decompress(dist_gz.read_bytes()).decode("utf-8")
except Exception as exc:
    raise SystemExit(f"gazon-intelligent-card.js.gz must be a valid gzip file: {exc}") from exc

if gz_text != dist_text:
    raise SystemExit(
        "gazon-intelligent-card.js.gz must decompress to gazon-intelligent-card.js — "
        "run: python3 scripts/build.py"
    )

# ── dist/ must be empty ───────────────────────────────────────────────────────

dist_dir = ROOT / "dist"
if dist_dir.exists():
    dist_entries = [p.name for p in dist_dir.iterdir() if p.is_file()]
    if dist_entries:
        raise SystemExit("dist/ must be empty — publish gazon-intelligent-card.js at repo root")

# ── Card structure ────────────────────────────────────────────────────────────

for marker in (
    "customElements.define",
    "window.customCards",
    "setConfig(",
    "set hass(",
    "connectedCallback()",
):
    if marker not in src_text:
        raise SystemExit(f"src/gazon-intelligent-card.js must contain: {marker}")

# Visual editor (ha-form or getConfigElement)
if "getConfigElement" not in src_text and "getConfigForm" not in src_text:
    raise SystemExit(
        "src/gazon-intelligent-card.js must expose getConfigElement() or getConfigForm() for the visual editor"
    )

# getLayoutOptions for grid sizing support
if "getLayoutOptions" not in src_text:
    raise SystemExit("src/gazon-intelligent-card.js must expose getLayoutOptions()")

# ── README sections ───────────────────────────────────────────────────────────

for heading in (
    "## 🧩 Exemple minimal",
    "## 🧱 Exemple YAML complet",
    "## 🧪 Développement",
):
    if heading not in readme:
        raise SystemExit(f"README.md must contain the section '{heading}'")

if "/local/gazon-intelligent-card/gazon-intelligent-card.js" not in readme:
    raise SystemExit("README.md must document the manual Lovelace resource path")

if "bundle + sources ensemble" not in readme:
    raise SystemExit("README.md must document that bundle and sources must be published together")

# README must contain a complete YAML example
yaml_match = re.search(r"## 🧱 Exemple YAML complet[\s\S]*?```yaml\n(?P<body>.*?)\n```", readme, re.S)
if not yaml_match:
    raise SystemExit("README.md must contain a complete YAML example block under '## 🧱 Exemple YAML complet'")

yaml_keys = re.findall(r"^(?!\s)([a-zA-Z0-9_]+):", yaml_match.group("body"), re.M)
if "type" not in yaml_keys:
    raise SystemExit("README.md complete YAML example must include 'type:'")
if "zones" not in yaml_keys:
    raise SystemExit("README.md complete YAML example must include 'zones:'")

print("Validation OK")
