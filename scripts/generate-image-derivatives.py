"""Generate checked-in responsive WebP previews for evidence screenshots.

This is a maintainer utility, not part of the npm build. Original PNG evidence
files remain unchanged and are still used as the high-resolution viewer target.
"""

from __future__ import annotations

import hashlib
import json
import argparse
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
REPORT = ROOT / "docs" / "portfolio-v3" / "phase-1d2b-release"
QUALITY = 92
WIDTHS = (480, 768, 1280)
SOURCES = (
    "projects/commerceflow/order-inventory.png",
    "projects/commerceflow/ai-service.png",
    "projects/ticket/workbench.png",
    "projects/ticket/trace.png",
    "projects/ticket/evaluation-metrics.png",
    "projects/devflow/workbench.png",
    "projects/devflow/trace.png",
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", choices=SOURCES)
    parser.add_argument("--skip-manifest", action="store_true")
    args = parser.parse_args()
    sources = (args.source,) if args.source else SOURCES
    records: list[dict[str, object]] = []
    for relative in sources:
        source = PUBLIC / relative
        before_hash = sha256(source)
        with Image.open(source) as opened:
            image = opened.convert("RGB")
            source_width, source_height = image.size
            destination = source.parent / "responsive"
            destination.mkdir(exist_ok=True)
            outputs: list[dict[str, object]] = []
            for width in sorted({*WIDTHS, source_width}):
                if width > source_width:
                    continue
                height = round(source_height * width / source_width)
                resized = image if width == source_width else image.resize(
                    (width, height), Image.Resampling.LANCZOS
                )
                output = destination / f"{source.stem}-{width}w.webp"
                resized.save(
                    output,
                    "WEBP",
                    quality=QUALITY,
                    method=6,
                    exact=True,
                )
                outputs.append(
                    {
                        "path": output.relative_to(PUBLIC).as_posix(),
                        "width": width,
                        "height": height,
                        "bytes": output.stat().st_size,
                        "sha256": sha256(output),
                    }
                )

        after_hash = sha256(source)
        if before_hash != after_hash:
            raise RuntimeError(f"Original evidence changed: {relative}")
        records.append(
            {
                "originalPath": relative,
                "originalWidth": source_width,
                "originalHeight": source_height,
                "originalBytes": source.stat().st_size,
                "originalSha256": before_hash,
                "quality": QUALITY,
                "tool": f"Pillow {Image.__version__}",
                "derivatives": outputs,
            }
        )

    if args.skip_manifest:
        return

    REPORT.mkdir(parents=True, exist_ok=True)
    manifest = {
        "policy": "responsive WebP previews; original PNG on demand in viewer",
        "quality": QUALITY,
        "tool": f"Pillow {Image.__version__}",
        "images": records,
    }
    (REPORT / "image-derivative-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
