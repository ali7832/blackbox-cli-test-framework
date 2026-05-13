from blackbox_framework.summary import build_summary


def test_build_summary_counts_pass_fail_and_duration():
    summary = build_summary(
        [
            {'passed': True, 'duration_ms': 10.5},
            {'passed': False, 'duration_ms': 20.0},
        ]
    )

    assert summary['total'] == 2
    assert summary['passed'] == 1
    assert summary['failed'] == 1
    assert summary['pass_rate'] == 50.0
    assert summary['total_duration_ms'] == 30.5
