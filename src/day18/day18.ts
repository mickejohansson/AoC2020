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

export default { evaluate }
