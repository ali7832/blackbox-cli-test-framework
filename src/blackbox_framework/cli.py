from __future__ import annotations

import typer
from rich.console import Console

from blackbox_framework.assertions import evaluate
from blackbox_framework.config import settings
from blackbox_framework.reports import ReportWriter
from blackbox_framework.runner import CommandRunner
from blackbox_framework.specs import SpecLoader
from blackbox_framework.summary import build_summary

app = typer.Typer(help='Blackbox CLI test framework')
console = Console()


@app.command()
def run(
    spec: str,
    report: str = settings.default_report_path,
    fail_fast: bool = settings.fail_fast,
) -> None:
    loader = SpecLoader()
    runner = CommandRunner()
    reporter = ReportWriter()

    payload = loader.load(spec)
    results = []

    for test in payload.get('tests', []):
        timeout = int(test.get('timeout_seconds', settings.default_timeout_seconds))
        command_result = runner.run(test['command'], timeout=timeout)
        passed, failures = evaluate(test, command_result)

        results.append(
            {
                'name': test['name'],
                'command': command_result.command,
                'passed': passed,
                'failures': failures,
                'returncode': command_result.returncode,
                'duration_ms': command_result.duration_ms,
                'timed_out': command_result.timed_out,
            }
        )

        if fail_fast and not passed:
            break

    output = {
        'suite': payload.get('suite', 'default'),
        'summary': build_summary(results),
        'results': results,
    }

    reporter.write(output, output=report)
    console.print_json(data=output)
