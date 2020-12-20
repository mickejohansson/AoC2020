import day20 from './day20'

test('it arranges the tiles and calculates the product of the corner ids', () => {
  expect(day20.cornerProduct(__dirname + '/testInput.txt')).toBe(20899048083289)
})
