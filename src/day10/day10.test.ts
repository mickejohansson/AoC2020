import fileReader from '../util/fileReader'
import day10 from './day10'

test('it connects all adapters', () => {
  let joltages = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day10.connectAdapters(joltages)).toMatchObject([0, 7, 0, 5])

  joltages = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day10.connectAdapters(joltages)).toMatchObject([0, 68, 0, 28])
})

test('it finds the number of ways to connect adapters', () => {
  let joltages = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day10.getNbrCombinations(joltages)).toBe(8)

  joltages = fileReader.readIntArray(__dirname + '/testInput2.txt')
  expect(day10.getNbrCombinations(joltages)).toBe(19208)

  joltages = fileReader.readIntArray(__dirname + '/testInput3.txt')
  expect(day10.getNbrCombinations(joltages)).toBe(149)

  joltages = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day10.getNbrCombinations(joltages)).toBe(10578455953408)
})
