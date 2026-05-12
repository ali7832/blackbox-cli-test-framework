from blackbox_framework.runner import CommandRunner


def test_runner_executes_command():
    runner = CommandRunner()
    result = runner.run('echo hello')

    assert result.returncode == 0
    assert 'hello' in result.stdout
