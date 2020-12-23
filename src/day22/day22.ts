import fileReader from '../util/fileReader'

const startDecks = (path: string): number[][] => {
  return fileReader.readStringArray(path, '\n\n').map((chunk) =>
    chunk
      .split('\n')
      .slice(1)
      .map((s) => parseInt(s))
  )
}

const score = (cards: number[]): number => {
  return cards
    .reverse()
    .reduce((acc, curr, index) => acc + curr * (index + 1), 0)
}

const play = (path: string): number => {
  const decks = startDecks(path)

  while (decks[0].length > 0 && decks[1].length > 0) {
    let winner = 0
    let loser = 1
    if (decks[1][0] > decks[0][0]) {
      winner = 1
      loser = 0
    }

    decks[winner].push(decks[winner][0])
    decks[winner].push(decks[loser][0])

    decks[winner] = decks[winner].slice(1)
    decks[loser] = decks[loser].slice(1)
  }

  return score(decks[0].length === 0 ? decks[1] : decks[0])
}

const playRecursiveGame = (startDecks: number[][]): number => {
  return undefined
}

export default { play, startDecks, playRecursiveGame }
