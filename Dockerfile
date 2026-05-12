FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml ./
COPY src ./src
COPY examples ./examples

RUN pip install --upgrade pip && pip install .

CMD ["blackbox", "run", "examples/spec.yml"]
