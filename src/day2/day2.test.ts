import day2 from './day2'
import fileReader from '../util/fileReader'

test('', () => {
  expect(
    day2.nbrValidPasswords(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'])
  ).toBe(2)
})
