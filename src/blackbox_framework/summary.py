from __future__ import annotations


def build_summary(results: list[dict]) -> dict:
    total = len(results)
    passed = sum(1 for item in results if item.get('passed'))
    failed = total - passed
    total_duration_ms = round(sum(float(item.get('duration_ms', 0.0)) for item in results), 2)
    pass_rate = round((passed / total) * 100, 2) if total else 0.0

    return {
        'total': total,
        'passed': passed,
        'failed': failed,
        'pass_rate': pass_rate,
        'total_duration_ms': total_duration_ms,
    }
