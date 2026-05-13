from __future__ import annotations

import subprocess
import time
from dataclasses import dataclass


@dataclass
class CommandResult:
    command: str
    returncode: int
    stdout: str
    stderr: str
    duration_ms: float
    timed_out: bool = False


class CommandRunner:
    def run(self, command: str, timeout: int = 10) -> CommandResult:
        started = time.perf_counter()
        try:
            process = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                timeout=timeout,
            )
            duration_ms = round((time.perf_counter() - started) * 1000, 2)
            return CommandResult(
                command=command,
                returncode=process.returncode,
                stdout=process.stdout.strip(),
                stderr=process.stderr.strip(),
                duration_ms=duration_ms,
                timed_out=False,
            )
        except subprocess.TimeoutExpired as exc:
            duration_ms = round((time.perf_counter() - started) * 1000, 2)
            return CommandResult(
                command=command,
                returncode=124,
                stdout=(exc.stdout or '').strip() if isinstance(exc.stdout, str) else '',
                stderr='command timed out',
                duration_ms=duration_ms,
                timed_out=True,
            )
