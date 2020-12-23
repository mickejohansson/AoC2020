import day21 from './day21'

test('it parses tiles', () => {
  expect(day21.solve(__dirname + '/testInput.txt')).toBe(5)
  expect(day21.solve(__dirname + '/input.txt')).toBe(2734)
})
