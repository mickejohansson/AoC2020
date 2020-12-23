import day22 from './day22'

test('it plays a game and returns the winning result', () => {
  expect(day22.play(__dirname + '/testInput.txt')).toBe(306)
  expect(day22.play(__dirname + '/input.txt')).toBe(33400)
})

test('it plays a game of recursive combar and returns the winning result', () => {
  const startDecks = day22.startDecks(__dirname + '/testInput2.txt')
  expect(day22.playRecursiveGame(startDecks)).toBe(291)
})
