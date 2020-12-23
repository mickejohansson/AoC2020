import day22 from './day22'

test('it plays a game and returns the winning result', () => {
  expect(day22.play(__dirname + '/testInput.txt')).toBe(306)
  expect(day22.play(__dirname + '/input.txt')).toBe(33400)
})
