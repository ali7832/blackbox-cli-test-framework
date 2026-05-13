# Blackbox CLI Test Framework

Enterprise CLI validation framework for platform teams, release engineers, and QA automation workflows. It validates command-line tools through observable behavior instead of internal implementation details.

## What This System Demonstrates

 includes YAML-driven test specifications, subprocess execution, configurable runtime defaults, timeout handling, assertion evaluation, suite summaries, JSON reporting, Docker deployment, CI, operational notes, and architecture decisions.

## Core Capabilities

- YAML-based test specifications
- Cross-runtime command execution for Python, Node, Go, Rust, Bash, and compiled CLIs
- Configurable default timeout, report path, and fail-fast behavior
- Exit-code assertions
- stdout/stderr assertions
- Timeout detection
- Duration tracking per command
- Suite-level summaries with pass rate and total duration
- JSON report generation for CI dashboards
- CLI runner for local and automated usage
- Docker-ready runtime
- GitHub Actions CI
- Pytest coverage
- Operations runbook and architecture decision record

## Quickstart

```bash
pip install .[dev]
blackbox run examples/spec.yml
pytest -q
```

## Example Spec

```yaml
suite: smoke-tests
tests:
  - name: python-version
    command: python --version
    expected_exit_code: 0
    stdout_contains: Python
    timeout_seconds: 5
```

## Runtime Configuration

See `.env.example` for default timeout, report output, and fail-fast configuration.

## Documentation

- `OPERATIONS.md`
- `docs/adr-001-blackbox-execution-model.md`
- `examples/spec.yml`

## Production Extension Roadmap

- JUnit XML output for CI dashboards
- Parallel execution workers
- Container-isolated command execution
- Plugin-based assertion packs
- Historical report storage and trend analysis
- HTML dashboard reports

## Highlights

- Demonstrates serious QA automation and developer tooling experience
- Shows CI/CD release-gate design, subprocess orchestration, structured reporting, and configurable execution
- Strong fit for platform engineering, test automation, DevOps, and backend infrastructure roles
