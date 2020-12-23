import day21 from './day21'

test('it finds the safe ingredients', () => {
  expect(day21.safeIngredients(__dirname + '/testInput.txt').length).toBe(5)
  expect(day21.safeIngredients(__dirname + '/input.txt').length).toBe(2734)
})

test('it finds the dangerous ingredients', () => {
  expect(day21.dangerousIngredients(__dirname + '/testInput.txt')).toBe(
    'mxmxvkd,sqjhc,fvjkl'
  )
  expect(day21.dangerousIngredients(__dirname + '/input.txt')).toBe(
    'kbmlt,mrccxm,lpzgzmk,ppj,stj,jvgnc,gxnr,plrlg'
  )
})
