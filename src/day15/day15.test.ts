import day15 from './day15'

test('it plays the game', () => {
  expect(day15.play([0, 3, 6], 10)).toBe(0)
  expect(day15.play([0, 3, 6], 2020)).toBe(436)
  expect(day15.play([0, 1, 4, 13, 15, 12, 16], 2020)).toBe(1665)

  expect(day15.play([0, 1, 4, 13, 15, 12, 16], 30000000)).toBe(16439)
})
