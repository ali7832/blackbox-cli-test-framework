from __future__ import annotations

from pathlib import Path

import yaml


class SpecLoader:
    def load(self, path: str | Path) -> dict:
        with open(path, 'r', encoding='utf-8') as handle:
            return yaml.safe_load(handle)
