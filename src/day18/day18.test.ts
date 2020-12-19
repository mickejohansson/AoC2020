import day18 from './day18'

test('it evaulates mathematical expressions', () => {
  expect(day18.evaluate('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
})
