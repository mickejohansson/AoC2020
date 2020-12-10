import fileReader from '../util/fileReader'
import day10 from './day10'

test('it connects all adapters', () => {
  let joltages = fileReader.readIntArray(__dirname + '/testInput.txt')
  expect(day10.connectAdapters(joltages)).toMatchObject([0, 7, 0, 5])

  joltages = fileReader.readIntArray(__dirname + '/input.txt')
  expect(day10.connectAdapters(joltages)).toMatchObject([0, 68, 0, 28])
})
