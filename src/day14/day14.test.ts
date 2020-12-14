import day14 from './day14'
import fileReader from '../util/fileReader'

test('it applies the mask', () => {
  expect(day14.masked('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 11)).toBe(73)
})

test('it runs the program', () => {
  expect(
    day14.runProgram([
      'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      'mem[8] = 11',
      'mem[7] = 101',
      'mem[8] = 0'
    ])
  ).toBe(165)

  expect(
    day14.runProgram(fileReader.readStringArray(__dirname + '/input.txt'))
  ).toBe(12610010960049)
})

test('it applies the mask to addresses', () => {
  expect(day14.masked('000000000000000000000000000000X1001X', 42)).toBe(73)
})
