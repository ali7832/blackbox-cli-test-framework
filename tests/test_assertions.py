from blackbox_framework.assertions import evaluate
from blackbox_framework.runner import CommandResult


def test_assertions_pass():
    result = CommandResult(
        command='echo ok',
        returncode=0,
        stdout='ok',
        stderr='',
    )

    passed, failures = evaluate(
        {
            'expected_exit_code': 0,
            'stdout_contains': 'ok',
        },
        result,
    )

    assert passed is True
    assert failures == []
