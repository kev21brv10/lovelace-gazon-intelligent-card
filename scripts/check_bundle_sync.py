from __future__ import annotations

from pathlib import Path
import argparse
import gzip
import hashlib


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_BUNDLE = ROOT / "gazon-intelligent-card.js"
DEFAULT_BUNDLE_GZ = ROOT / "gazon-intelligent-card.js.gz"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_text(path: Path) -> str:
    if path.suffix == ".gz":
        return gzip.decompress(path.read_bytes()).decode("utf-8")
    return path.read_text(encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare the repo bundle against one or more installed bundles.")
    parser.add_argument("paths", nargs="+", help="Paths to compare with the repo bundle")
    args = parser.parse_args()

    repo_bundle = DEFAULT_BUNDLE
    repo_bundle_gz = DEFAULT_BUNDLE_GZ
    if not repo_bundle.exists():
        raise SystemExit("Repo bundle gazon-intelligent-card.js is missing. Run scripts/build.py first.")
    if not repo_bundle_gz.exists():
        raise SystemExit("Repo bundle gazon-intelligent-card.js.gz is missing. Run scripts/build.py first.")

    repo_text_hash = sha256(repo_bundle)
    repo_gz_hash = sha256(repo_bundle_gz)

    print(f"repo  {repo_bundle.name}: {repo_text_hash}")
    print(f"repo  {repo_bundle_gz.name}: {repo_gz_hash}")

    for raw_path in args.paths:
        target = Path(raw_path)
        if not target.exists():
            raise SystemExit(f"Target bundle missing: {target}")
        target_hash = sha256(target)
        print(f"target {target}: {target_hash}")
        if target.suffix == ".gz":
            target_text_hash = hashlib.sha256(gzip.decompress(target.read_bytes())).hexdigest()
            print(f"target {target} (decompressed): {target_text_hash}")
            if target_text_hash != repo_text_hash:
                raise SystemExit(f"Decompressed content differs for {target}")
        else:
            target_text = read_text(target)
            repo_text = read_text(repo_bundle)
            if target_text != repo_text:
                raise SystemExit(f"Content differs for {target}")

    print("Bundle sync OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
