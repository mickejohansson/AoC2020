import day19 from './day19'
import fileReader from '../util/fileReader'

test('it finds the number of matching messages in the test data', () => {
  const input = fileReader
    .readStringArray(__dirname + '/testInput.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  const rules: Map<number, string> = new Map()
  input[0]
    .map((r) => r.split(': '))
    .forEach((r) => rules.set(parseInt(r[0]), r[1]))
  expect(day19.nbrMatching(rules, input[1])).toBe(2)
})

test('it finds the number of matching messages in the real data', () => {
  const input = fileReader
    .readStringArray(__dirname + '/input.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  const rules: Map<number, string> = new Map()
  input[0]
    .map((r) => r.split(': '))
    .forEach((r) => rules.set(parseInt(r[0]), r[1]))
  expect(day19.nbrMatching(rules, input[1])).toBe(205)
})

test('it finds the number of matching messages in the second set of test data', () => {
  const input = fileReader
    .readStringArray(__dirname + '/testInput2.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  const rules: Map<number, string> = new Map()
  input[0]
    .map((r) => r.split(': '))
    .forEach((r) => rules.set(parseInt(r[0]), r[1]))
  expect(day19.nbrMatching(rules, input[1])).toBe(3)
})

test('it finds the number of matching messages in the second set of test data using recursive rules', () => {
  const input = fileReader
    .readStringArray(__dirname + '/testInput2.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  const rules: Map<number, string> = new Map()
  input[0]
    .map((r) => r.split(': '))
    .forEach((r) => rules.set(parseInt(r[0]), r[1]))
  expect(day19.nbrMatching(rules, input[1], true)).toBe(12)
})
