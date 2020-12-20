const ruleRegex = (
  rule: string,
  rules: Map<number, string>,
  cache: Map<number, string>
): string => {
  let prefix = ''
  if (rule.includes('|')) {
    prefix += '('
  }
  if (rule.includes('R8')) {
    prefix += '?<R8>'
  } else if (rule.includes('R11')) {
    prefix += '?<R11>'
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
            if (rulePart === 'R8') {
              return '\\k<R8>'
            }
            if (rulePart === 'R11') {
              return '\\k<R11>'
            }
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
    rules.set(8, '42 | 42 R8')
    rules.set(11, '42 31 | 42 R11 31')
  }
  console.log('rules', rules)
  const cache: Map<number, string> = new Map()
  const regex = ruleRegex(rules.get(0), rules, cache)
  console.log('regex', regex)
  return messages
    .map((message) => message.match('^' + regex + '$'))
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
}

export default { nbrMatching }
