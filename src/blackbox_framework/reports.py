from __future__ import annotations

import json
from pathlib import Path


class ReportWriter:
    def write(self, payload: dict, output: str | Path = 'report.json') -> Path:
        target = Path(output)
        target.write_text(json.dumps(payload, indent=2), encoding='utf-8')
        return target
