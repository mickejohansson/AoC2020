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

const errorRate = (note: Note): number => {
  return undefined
}

export default { parseNotes, errorRate }
