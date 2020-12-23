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

const playRecursive = (decks: number[][]): number => {
  const previousRoundDecks: string[] = []

  let i = 1
  while (decks[0].length > 0 && decks[1].length > 0) {
    // If these hands have been played in a previous round, player 1 wins the game
    const round = decks[0].join(',') + ':' + decks[1].join(',')
    if (previousRoundDecks.includes(round)) {
      return 0
    } else {
      previousRoundDecks.push(round)
    }

    let winner = 0

    // If both players have at least as many cards left as the card they drew, recurse
    if (decks[0][0] < decks[0].length && decks[1][0] < decks[1].length) {
      winner = playRecursive(decks.map((deck) => deck.slice(1, deck[0] + 1)))
    } else if (decks[1][0] > decks[0][0]) {
      winner = 1
    }

    const loser = (winner + 1) % 2

    decks[winner].push(decks[winner][0])
    decks[winner].push(decks[loser][0])

    decks[winner] = decks[winner].slice(1)
    decks[loser] = decks[loser].slice(1)

    i++
  }

  return decks[0].length === 0 ? 1 : 0
}

const playRecursiveGame = (decks: number[][]): number => {
  const winner = playRecursive(decks)

  return score(decks[winner])
}

export default { play, startDecks, playRecursiveGame }
