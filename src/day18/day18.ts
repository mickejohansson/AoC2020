const operate = (left: number, operator: string, right: number): number => {
  if (operator === '+') {
    return left + right
  } else {
    return left * right
  }
}

const evaluate = (expression: string): number => {
  let result = 0
  let operator = '+'
  let i = 0
  while (i < expression.length) {
    const char = expression.charAt(i)
    const nbr = parseInt(char)
    if (!isNaN(nbr)) {
      result = operate(result, operator, nbr)
    } else if (char === '+' || char === '*') {
      operator = char
    } else if (char === '(') {
      let depth = 1
      let j = i + 1
      let found = false
      while (j < expression.length && !found) {
        if (expression.charAt(j) === '(') {
          depth++
        } else if (expression.charAt(j) === ')') {
          depth--
          if (depth === 0) {
            found = true
            break
          }
        }
        j++
      }
      result = operate(
        result,
        operator,
        evaluate(expression.substring(i + 1, j))
      )
      i = j
    }
    i++
  }
  return result
}

// Evaluate expressions such as ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
const evaluateAdvanced = (expression: string): number => {
  expression = '(' + expression + ')'
  let i = 0
  while (expression.split(' ').length > 1) {
    // First solve any additions: ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 =>
    //                            ((6 * 9) * (15 * 14) + 6) + 6 * 2
    expression = expression.replace(/(\d+) \+ (\d+)/g, (substring, a, b) => {
      return (parseInt(a) + parseInt(b)).toString()
    })

    // Solve any parantheses containing just multiplication:
    //  ((6 * 9) * (15 * 14) + 6) + 6 * 2  =>
    //  ((54) * (210) + 6) + 6 * 2
    expression = expression.replace(
      /\((\d+(?: [\*] \d+)+)\)/g,
      (substring, exp) => {
        return exp
          .split('*')
          .map((s) => parseInt(s))
          .reduce((acc, curr) => acc * curr)
      }
    )

    // Remove any unnecessary parantheses
    // ((54) * (210) + 6) + 6 * 2 =>
    // (54 * 210 + 6) + 6 * 2
    expression = expression.replace(/\((\d+)\)/, (substring, a) => a)
    i++
  }

  return parseInt(expression)
}

export default { evaluate, evaluateAdvanced }
