import fileReader from '../util/fileReader'

const startDecks = (path: string): number[][] => {
  return fileReader.readStringArray(path, '\n\n').map((chunk) =>
    chunk
      .split('\n')
      .slice(1)
      .map((s) => parseInt(s))
  )
}

const play = (path: string): number => {
  const decks = startDecks(path)
  console.log('Start Decks', decks)

  return undefined
}

export default { play }
