const ruleRegex = (
  rule: string,
  rules: string[],
  cache: Map<number, string>
): string => {
  return (
    (rule.includes('|') ? '(' : '') +
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
                r = ruleRegex(rules[parseInt(rulePart)], rules, cache)
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

const nbrMatching = (rules: string[], messages: string[]): number => {
  rules = rules
    .map((rule) => rule.split(': '))
    .sort((r1, r2) => parseInt(r1[0]) - parseInt(r2[0]))
    .map((r) => r[1])
  const cache: Map<number, string> = new Map()
  const regex = ruleRegex(rules[0], rules, cache)
  return messages
    .map((message) => message.match('^' + regex + '$'))
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
}

export default { nbrMatching }
