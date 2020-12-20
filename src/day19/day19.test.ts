import day19 from './day19'
import fileReader from '../util/fileReader'

test('it finds the number of matching messages in the test data', () => {
  const input = fileReader
    .readStringArray(__dirname + '/testInput.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  expect(
    day19.nbrMatching(
      input[0].map((rule) => rule.split(': ')[1]),
      input[1]
    )
  ).toBe(2)
})

test('it finds the number of matching messages in the real data', () => {
  const input = fileReader
    .readStringArray(__dirname + '/input.txt', '\n\n')
    .map((chunk) => chunk.split('\n'))
  expect(
    day19.nbrMatching(
      input[0].map((rule) => rule.split(': ')[1]),
      input[1]
    )
  ).toBe(2)
})
