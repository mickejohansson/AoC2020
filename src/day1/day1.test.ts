import day1 from './day1'
import fileReader from '../util/fileReader'

test('it calculates the 2-product correctly', () => {
  expect(day1.find2Product([1721, 979, 366, 299, 675, 1456])).toBe(514579)
  expect(
    day1.find2Product(
      fileReader.readArray(__dirname + '/input.txt').map((s) => parseInt(s))
    )
  ).toBe(927684)
})

test('it calculates the 3-product correctly', () => {
  expect(day1.find3Product([1721, 979, 366, 299, 675, 1456])).toBe(241861950)
  expect(
    day1.find3Product(
      fileReader.readArray(__dirname + '/input.txt').map((s) => parseInt(s))
    )
  ).toBe(292093004)
})
