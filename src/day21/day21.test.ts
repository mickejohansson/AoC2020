import day21 from './day21'

test('it parses tiles', () => {
  expect(day21.safeIngredients(__dirname + '/testInput.txt').length).toBe(5)
  expect(day21.safeIngredients(__dirname + '/input.txt').length).toBe(2734)
})
