import day5 from './day5'

test('it calculates the binaryPartitions', () => {
  const a = 'FBFBBFF'.split('')
  expect(day5.binaryPartition(128, a)).toMatchObject([44])
  const b = 'RLR'.split('')
  expect(day5.binaryPartition(7, b)).toMatchObject([5])
})

test('it calculates the seat id', () => {
  expect(day5.calculateSeatId('FBFBBFFRLR')).toBe(357)
  expect(day5.calculateSeatId('BFFFBBFRRR')).toBe(567)
  expect(day5.calculateSeatId('FFFBBBFRRR')).toBe(119)
  expect(day5.calculateSeatId('BBFFBBFRLL')).toBe(820)
})

test('it calculates the highes seat id', () => {
  expect(day5.calculateHighestSeatId(__dirname + '/input.txt')).toBe(850)
})

test('it finds the missing seat id', () => {
  expect(day5.findMissingSeatId(__dirname + '/input.txt')).toBe(599)
})
