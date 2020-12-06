import day6 from './day6'
import fileReader from '../util/fileReader'

test('it counts the number of positive answers in the test input', () => {
  const testInput = fileReader
    .readStringArray(__dirname + '/testInput.txt', '\n\n')
    .map((line) => line.split('\n'))
  expect(day6.nbrYes(testInput)).toBe(11)
})

test('it counts the number of positive answers in the real input', () => {
  const testInput = fileReader
    .readStringArray(__dirname + '/input.txt', '\n\n')
    .map((line) => line.split('\n'))
  expect(day6.nbrYes(testInput)).toBe(6885)
})

test('it gets the intersection of multiple arrays', () => {
  expect(
    day6.intersection([
      ['A', 'B', 'C'],
      ['A', 'B']
    ])
  ).toMatchObject(['A', 'B'])

  expect(day6.intersection([['A', 'B', 'C']])).toMatchObject(['A', 'B', 'C'])

  expect(
    day6.intersection([
      ['A', 'B', 'C', 'D'],
      ['B', 'D', 'E']
    ])
  ).toMatchObject(['B', 'D'])
})

test('it counts the number of answers that was positive for all persons in a group in the test input', () => {
  const testInput = fileReader
    .readStringArray(__dirname + '/testInput.txt', '\n\n')
    .map((line) => line.split('\n'))
  expect(day6.nbrAllYes(testInput)).toBe(6)
})

test('it counts the number of answers that was positive for all persons in a group in the real input', () => {
  const testInput = fileReader
    .readStringArray(__dirname + '/input.txt', '\n\n')
    .map((line) => line.split('\n'))
  expect(day6.nbrAllYes(testInput)).toBe(3550)
})
