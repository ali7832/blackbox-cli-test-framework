from __future__ import annotations

from dataclasses import dataclass
import os


@dataclass(frozen=True)
class FrameworkSettings:
    default_timeout_seconds: int = int(os.getenv('BLACKBOX_DEFAULT_TIMEOUT_SECONDS', '10'))
    default_report_path: str = os.getenv('BLACKBOX_DEFAULT_REPORT_PATH', 'report.json')
    fail_fast: bool = os.getenv('BLACKBOX_FAIL_FAST', 'false').lower() == 'true'


settings = FrameworkSettings()
