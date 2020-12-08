import day8 from './day8'

test('it runs code', () => {
  expect(day8.run(__dirname + '/testInput.txt')).toBe(5)
  expect(day8.run(__dirname + '/input.txt')).toBe(5)
})
