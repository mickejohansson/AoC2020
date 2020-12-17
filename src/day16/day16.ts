import fileReader from '../util/fileReader'

interface Rule {
  name: string
  ranges: number[][]
}

interface Note {
  rules: Rule[]
  myTicket: number[]
  nearbyTickets: number[][]
}

const parseNotes = (path: string): Note => {
  const note: Note = { rules: [], myTicket: [], nearbyTickets: [] }
  const sections = fileReader.readStringArray(path, '\n\n')
  const rules: Rule[] = sections[0].split('\n').map((r) => {
    const matches = r.match(/(\D+): (\d+-\d+) or (\d+-\d+)/)
    return {
      name: matches[1],
      ranges: matches.slice(2).map((r) => r.split('-').map((s) => parseInt(s)))
    }
  })
  note.rules = rules

  const myTicket = sections[1]
    .split(':')[1]
    .split(',')
    .map((s) => parseInt(s))
  note.myTicket = myTicket

  const nearbyTickets = sections[2]
    .split(':')[1]
    .trim()
    .split('\n')
    .map((s) => s.split(',').map((s) => parseInt(s)))
  note.nearbyTickets = nearbyTickets

  return note
}

const matchingRules = (nbr: number, rules: Rule[]): Rule[] => {
  const matching: Rule[] = []
  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < rules[i].ranges.length; j++) {
      if (nbr >= rules[i].ranges[j][0] && nbr <= rules[i].ranges[j][1]) {
        matching.push(rules[i])
      }
    }
  }

  return matching
}

const errorRate = (note: Note): number => {
  return note.nearbyTickets
    .flatMap((ticket) =>
      ticket.map((nbr) => {
        return {
          matches: matchingRules(nbr, note.rules).length > 0,
          number: nbr
        }
      })
    )
    .filter((m) => m.matches === false)
    .reduce((acc, curr) => acc + curr.number, 0)
}

const departureSum = (note: Note): number => {
  const validTickets: number[][] = note.nearbyTickets
    .map((ticket) => {
      return {
        isValid: ticket.every((n) => matchingRules(n, note.rules).length > 0),
        ticket
      }
    })
    .filter((m) => m.isValid)
    .map((m) => m.ticket)

  const possibleMatches: Rule[][] = []
  for (let i = 0; i < validTickets[0].length; i++) {
    possibleMatches[i] = note.rules
    for (let j = 0; j < validTickets.length; j++) {
      const m = matchingRules(validTickets[j][i], note.rules)
      possibleMatches[i] = possibleMatches[i].filter((possible) =>
        m.find((x) => x.name === possible.name)
      )
    }
  }

  const matches: Map<string, number> = new Map()

  let posMatches = possibleMatches.map((p, i) => {
    return { pos: i, ruleNames: p.map((rule) => rule.name) }
  })

  let i = 0
  while (posMatches.length > 0) {
    posMatches
      .filter((p) => p.ruleNames.length === 1)
      .forEach((p) => matches.set(p.ruleNames[0], p.pos))

    posMatches = posMatches.filter((p) => p.ruleNames.length > 1)
    posMatches = posMatches.map((p) => {
      return {
        pos: p.pos,
        ruleNames: p.ruleNames.filter((m) => !matches.has(m))
      }
    })

    i++
  }

  const lookup = Array.from(matches)
  const myTicket = note.myTicket.map((nbr, index) => {
    return {
      ruleName: lookup.find((l) => l[1] === index)[0],
      value: nbr
    }
  })

  return myTicket
    .filter((m) => m.ruleName.startsWith('departure'))
    .reduce((acc, curr) => acc * curr.value, 1)
}

export default { parseNotes, errorRate, departureSum }
