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

  console.log('Possible', possibleMatches)

  return undefined
}

export default { parseNotes, errorRate, departureSum }
