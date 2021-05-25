Describe 'calc()'              # Example group
  calc() { echo "$(($*))"; }

  It 'calculates the formula'  # Example
    When call calc 1 + 2       # Evaluation
    The output should equal 3  # Expectation
  End
End
