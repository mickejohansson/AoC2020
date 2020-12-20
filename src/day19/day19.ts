const ruleRegex = (
  rule: string,
  rules: Map<number, string>,
  cache: Map<number, string>
): string => {
  let prefix = ''
  if (rule.includes('|')) {
    prefix += '('
  }
  return (
    prefix +
    rule
      .split(' | ')
      .map((altRule) =>
        altRule
          .split(' ')
          .map((rulePart) => {
            let r = undefined
            if (rulePart.startsWith('"')) {
              r = rulePart.charAt(1)
            } else {
              const cached = cache.get(parseInt(rulePart))
              if (cached) {
                r = cached
              } else {
                r = ruleRegex(rules.get(parseInt(rulePart)), rules, cache)
                cache.set(parseInt(rulePart), r)
              }
            }
            return r
          })
          .join('')
      )
      .join('|') +
    (rule.includes('|') ? ')' : '')
  )
}

const nbrMatching = (
  rules: Map<number, string>,
  messages: string[],
  useRecursiveRules: boolean = false
): number => {
  if (useRecursiveRules) {
    rules.set(
      8,
      '42 | 42 42 | 42 42 42 | 42 42 42 42 | 42 42 42 42 42 | 42 42 42 42 42 | 42 42 42 42 42 42 | 42 42 42 42 42 42 42 | 42 42 42 42 42 42 42 42'
    )
    rules.set(
      11,
      '42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31'
    )
  }
  const cache: Map<number, string> = new Map()
  const regex = ruleRegex(rules.get(0), rules, cache)
  return messages
    .map((message) => message.match('^' + regex + '$'))
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
}

export default { nbrMatching }
