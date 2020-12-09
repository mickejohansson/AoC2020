import fileReader from '../util/fileReader'
import day9 from './day9'

test('it checks if a number is the sum of numbers in an array', () => {
  expect(day9.isSumOf(5, [3, 2, 7, 9, 2])).toBe(true)
})

test('it finds the first erroneus number', () => {
  let nbrs = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day9.firstIncorrectNbr(nbrs, 5)).toBe(127)

  nbrs = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day9.firstIncorrectNbr(nbrs, 25)).toBe(3199139634)
})

test('it finds the continues set of numbers that add up to a specific number', () => {
  let nbrs = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day9.findContinousSet(127, nbrs)).toMatchObject([15, 25, 47, 40])
})

test('it finds the encryption weakness', () => {
  let nbrs = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day9.findEncryptionWeakness(nbrs, 5)).toBe(62)

  nbrs = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day9.findEncryptionWeakness(nbrs, 25)).toBe(438559930)
})
