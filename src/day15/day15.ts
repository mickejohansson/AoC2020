interface Round {
  nbr: number
  index: number
}

const play = (startingNumbers: number[], nbrRounds: number): number => {
  const rounds: Round[] = startingNumbers.map((n, i) => {
    return { nbr: n, index: i + 1 }
  })

  for (let i = rounds.length; i < nbrRounds; i++) {
    const last = rounds[i - 1]
    const matching = rounds.filter((r) => r.nbr === last.nbr)
    if (matching.length <= 1) {
      rounds.push({ nbr: 0, index: i + 1 })
    } else {
      rounds.push({
        nbr:
          matching[matching.length - 1].index -
          matching[matching.length - 2].index,
        index: i + 1
      })
    }
  }

  return rounds[rounds.length - 1].nbr
}

export default { play }
