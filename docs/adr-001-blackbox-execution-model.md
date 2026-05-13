# ADR-001: Black-Box Command Execution Model

## Status

Accepted

## Context

Developer tooling and internal CLIs often need validation without importing their code directly. A test framework should validate observable behavior: command exit codes, stdout, stderr, duration, and timeout behavior.

## Decision

The framework executes commands as subprocesses and evaluates assertions against command outputs. Test cases are defined in YAML so QA, platform, and release teams can review expected behavior without modifying Python code.

## Consequences

Benefits:

- Works across Python, Node, Go, Rust, Bash, and compiled binaries.
- Validates real runtime behavior instead of implementation details.
- Fits naturally into CI/CD release gates.
- Produces portable JSON reports for downstream dashboards.

Tradeoffs:

- Requires careful command sandboxing in sensitive environments.
- Parallel execution and container isolation are deferred production extensions.
