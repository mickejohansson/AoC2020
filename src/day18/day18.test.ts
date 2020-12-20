import day18 from './day18'
import fileReader from '../util/fileReader'

test('it evaulates mathematical expressions', () => {
  expect(day18.evaluate('1 + 2 * 3 + 4 * 5 + 6')).toBe(71)
  expect(day18.evaluate('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
  expect(day18.evaluate('2 * 3 + (4 * 5)')).toBe(26)
  expect(day18.evaluate('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(437)
  expect(day18.evaluate('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(
    12240
  )
  expect(
    day18.evaluate('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
  ).toBe(13632)
})

test('it sums up all solutions', () => {
  const sum = fileReader
    .readStringArray(__dirname + '/input.txt')
    .map((line) => day18.evaluate(line))
    .reduce((acc, curr) => acc + curr, 0)

  expect(sum).toBe(53660285675207)
})

test('it evaluates the expression using advanced mathematics', () => {
  expect(day18.evaluateAdvanced('1 + 2 * 3 + 4 * 5 + 6')).toBe(231)
  expect(day18.evaluateAdvanced('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
  expect(day18.evaluateAdvanced('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(1445)
  expect(
    day18.evaluateAdvanced('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')
  ).toBe(669060)
  expect(
    day18.evaluateAdvanced('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
  ).toBe(23340)
})

test('it sums up all solutions using advances mathematics', () => {
  const sum = fileReader
    .readStringArray(__dirname + '/input.txt')
    .map((line) => day18.evaluateAdvanced(line))
    .reduce((acc, curr) => acc + curr, 0)

  expect(sum).toBe(141993988282687)
})
