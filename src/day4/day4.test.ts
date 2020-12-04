import day4 from './day4'

test('it returns the number of valid inputs', () => {
  expect(day4.nbrValidPassports(__dirname + '/testInput.txt')).toBe(2)
  expect(day4.nbrValidPassports(__dirname + '/input.txt')).toBe(222)
})
