# Operations Runbook

## Purpose

This framework is designed for black-box validation of command-line tools across languages and runtimes. It is useful for platform teams validating developer tools, internal CLIs, data pipelines, scripts, and release artifacts.

## Runtime Configuration

Environment variables are documented in `.env.example`:

- `BLACKBOX_DEFAULT_TIMEOUT_SECONDS`: default command timeout.
- `BLACKBOX_DEFAULT_REPORT_PATH`: default JSON report output.
- `BLACKBOX_FAIL_FAST`: stop execution after the first failing test.

## Execution Flow

1. Load a YAML test suite.
2. Execute each command in an isolated subprocess.
3. Capture stdout, stderr, return code, timeout state, and duration.
4. Evaluate assertions.
5. Produce a structured JSON report with suite summary.

## CI Usage

Use this framework as a release gate for CLIs. A failing command assertion should block deployment until the tool behavior is fixed or the spec is intentionally updated.

## Production Roadmap

- JUnit XML output for CI dashboards.
- Parallel test execution.
- Container-isolated command execution.
- Plugin-based assertions.
- Historical report storage.
