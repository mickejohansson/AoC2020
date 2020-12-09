import fileReader from '../util/fileReader'
import day9 from './day9'

/*
test('it checks if a number is the sum of numbers in an array', () => {
  expect(day9.isSumOf(5, [3, 2, 7, 9, 2])).toBe(true)
})
*/

test('it finds the first erroneus number', () => {
  let nbrs = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day9.firstIncorrectNbr(nbrs, 5)).toBe(127)

  nbrs = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day9.firstIncorrectNbr(nbrs, 25)).toBe(3199139634)
})
