# Architecture

## Components

- YAML spec loader
- Command execution runner
- Assertion engine
- JSON report generator
- CLI interface
- Docker runtime
- CI pipeline

## Execution Flow

1. Load YAML suite
2. Execute CLI commands
3. Capture stdout/stderr/exit codes
4. Run assertions
5. Generate JSON report
6. Return suite summary
