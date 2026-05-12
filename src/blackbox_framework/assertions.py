from __future__ import annotations

from blackbox_framework.runner import CommandResult


def evaluate(test_case: dict, result: CommandResult) -> tuple[bool, list[str]]:
    failures: list[str] = []

    expected_exit_code = test_case.get('expected_exit_code')
    if expected_exit_code is not None and result.returncode != expected_exit_code:
        failures.append(f'expected exit code {expected_exit_code}, got {result.returncode}')

    stdout_contains = test_case.get('stdout_contains')
    if stdout_contains and stdout_contains not in result.stdout:
        failures.append(f'stdout did not contain {stdout_contains!r}')

    stderr_contains = test_case.get('stderr_contains')
    if stderr_contains and stderr_contains not in result.stderr:
        failures.append(f'stderr did not contain {stderr_contains!r}')

    return len(failures) == 0, failures
