const ruleRegex = (rule: string, rules: string[]): string => {
  return (
    (rule.includes('|') ? '(' : '') +
    rule
      .split(' | ')
      .map((altRule) =>
        altRule
          .split(' ')
          .map((rulePart) => {
            if (rulePart.startsWith('"')) {
              return rulePart.charAt(1)
            } else {
              return ruleRegex(rules[parseInt(rulePart)], rules)
            }
          })
          .join('')
      )
      .join('|') +
    (rule.includes('|') ? ')' : '')
  )
}

const nbrMatching = (rules: string[], messages: string[]): number => {
  const regex = ruleRegex(rules[0], rules)
  return messages
    .map((message) => message.match('^' + regex + '$'))
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
}

export default { nbrMatching }
