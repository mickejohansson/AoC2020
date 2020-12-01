import fileReader from './fileReader'

test('it reads a file and returns a string array', () => {
  expect(
    fileReader.readStringArray(__dirname + '/testInput.txt')
  ).toMatchObject([
    '116860',
    '130144',
    '79347',
    '120725',
    '137692',
    '139037',
    '72089',
    '133224'
  ])
})

test('it reads a file and returns an int array', () => {
  expect(fileReader.readIntArray(__dirname + '/testInput.txt')).toMatchObject([
    116860,
    130144,
    79347,
    120725,
    137692,
    139037,
    72089,
    133224
  ])
})
