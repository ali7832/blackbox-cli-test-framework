# Blackbox CLI Test Framework

Production-ready black-box testing framework for validating command-line tools across languages and runtimes.

## Features

- YAML-based test specifications
- Command execution with timeout handling
- Exit-code assertions
- stdout/stderr assertions
- JSON report generation
- CLI runner
- Docker-ready runtime
- GitHub Actions CI
- Pytest test suite

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
```

## Portfolio Highlights

- Demonstrates test automation and developer tooling skills
- Useful for validating Python, Node, Go, Rust, Bash, and compiled CLIs
- Built as a deployable, CI-friendly quality engineering platform
