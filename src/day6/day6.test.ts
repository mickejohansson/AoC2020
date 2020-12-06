import day6 from './day6'
import fileReader from '../util/fileReader'

test('it counts the number of yeses', () => {
  const testInput = fileReader
    .readStringArray(__dirname + '/testInput.txt', '\n\n')
    .map((line) => line.split('\n'))
  expect(day6.nbrYes(testInput)).toBe(11)
})
