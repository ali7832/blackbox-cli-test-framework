# Usage Guide

Install the package with development dependencies, then run the sample suite with the blackbox command.

Commands:

- blackbox run examples/spec.yml
- pytest -q
- docker-compose up --build

A test spec contains a suite name and a list of command tests. Each test can validate the expected exit code, stdout text, and stderr text.
