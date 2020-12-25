import day25 from './day25'

test('it gets the loop size', () => {
  expect(day25.determineLoopSize(5764801)).toBe(8)
  expect(day25.determineLoopSize(17807724)).toBe(11)
})