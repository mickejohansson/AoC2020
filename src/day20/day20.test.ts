import day20 from './day20'

test('it arranges the tiles and calculates the product of the corner ids', () => {
  expect(day20.cornerProduct(__dirname + '/testInput.txt')).toBe(20899048083289)
  expect(day20.cornerProduct(__dirname + '/input.txt')).toBe(28057939502729)
})

test('it arranges the tiles', () => {
  expect(day20.arrangeTiles(__dirname + '/testInput.txt')).toMatchObject([])
})
