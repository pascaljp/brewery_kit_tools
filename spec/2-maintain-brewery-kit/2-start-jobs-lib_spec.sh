Describe 'calc()'              # Example group
  Include 2-maintain-brewery-kit/2-start-jobs-lib.sh

  # calc() { echo "$(($*))"; }

  # It 'calculates the formula'  # Example
  #   When call calc 1 + 2       # Evaluation
  #   The output should equal 3  # Expectation
  # End

  It 'test'
    When call create_config_file 'pascaljp/inkbird:latest'
    The output should equal 1
  End
End
