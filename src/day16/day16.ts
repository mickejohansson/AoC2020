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

const matchesAnyRule = (nbr: number, rules: Rule[]) => {
  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < rules[i].ranges.length; j++) {
      if (nbr >= rules[i].ranges[j][0] && nbr <= rules[i].ranges[j][1]) {
        return true
      }
    }
  }

  return false
}

const errorRate = (note: Note): number => {
  return note.nearbyTickets
    .flatMap((ticket) =>
      ticket.map((nbr) => {
        return { matches: matchesAnyRule(nbr, note.rules), number: nbr }
      })
    )
    .filter((m) => m.matches === false)
    .reduce((acc, curr) => acc + curr.number, 0)
}

export default { parseNotes, errorRate }
