interface Match {
  turn: number
  distance: number
}

const play = (start: number[], nbrTurns: number): number => {
  const matches: Map<number, Match> = new Map()

  start.forEach((n, i) => matches.set(n, { turn: i + 1, distance: 0 }))

  let last = start[start.length - 1]
  for (let turn = start.length + 1; turn <= nbrTurns; turn++) {
    let next = matches.get(last).distance

    const prevOccurence = matches.get(next)
    const distance = prevOccurence ? turn - prevOccurence.turn : 0
    matches.set(next, { turn, distance })

    last = next
  }

  return last
}

export default { play }
