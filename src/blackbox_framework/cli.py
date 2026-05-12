from __future__ import annotations

import typer
from rich.console import Console

from blackbox_framework.assertions import evaluate
from blackbox_framework.reports import ReportWriter
from blackbox_framework.runner import CommandRunner
from blackbox_framework.specs import SpecLoader

app = typer.Typer(help='Blackbox CLI test framework')
console = Console()


@app.command()
def run(spec: str) -> None:
    loader = SpecLoader()
    runner = CommandRunner()
    reporter = ReportWriter()

    payload = loader.load(spec)
    results = []

    for test in payload.get('tests', []):
        command_result = runner.run(test['command'])
        passed, failures = evaluate(test, command_result)

        results.append(
            {
                'name': test['name'],
                'passed': passed,
                'failures': failures,
                'returncode': command_result.returncode,
            }
        )

    report = {
        'suite': payload.get('suite', 'default'),
        'results': results,
    }

    reporter.write(report)
    console.print_json(data=report)
