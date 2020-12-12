import day12 from './day12'

test('it finds the manhattan distancep', () => {
  expect(day12.manhattan(__dirname + '/testInput.txt')).toBe(25)
  expect(day12.manhattan(__dirname + '/input.txt')).toBe(1294)
})
