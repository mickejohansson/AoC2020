import day19 from './day19'
import fileReader from '../util/fileReader'

test('it evaulates mathematical expressions', () => {
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
