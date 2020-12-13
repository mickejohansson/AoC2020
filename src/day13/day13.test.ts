import day13, { Departure } from './day13'
import fileReader from '../util/fileReader'

test('it finds the nearest bus to catch', () => {
  let departure: Departure = day13.earliestDeparture(
    __dirname + '/testInput.txt'
  )
  expect(departure.busId * departure.waitTime).toBe(295)

  departure = day13.earliestDeparture(__dirname + '/input.txt')
  expect(departure.busId * departure.waitTime).toBe(138)
})

test('it finds the nearest special timestamp', () => {
  expect(day13.earliestSpecialTimestamp(['17', 'x', '13', '19'])).toBe(3417)
  expect(day13.earliestSpecialTimestamp(['6', '25'])).toBe(24)
  expect(day13.earliestSpecialTimestamp(['6', '25', '26'])).toBe(24)
  expect(day13.earliestSpecialTimestamp(['6', '25', '2'])).toBe(24)
  expect(day13.earliestSpecialTimestamp(['6', '25', 'x', '3'])).toBe(24)
  expect(day13.earliestSpecialTimestamp(['67', '7', '59', '61'])).toBe(754018)

  expect(
    day13.earliestSpecialTimestamp(['7', '13', 'x', 'x', '59', 'x', '31', '19'])
  ).toBe(1068781)
  /*
  const input = fileReader
    .readStringArray(__dirname + '/input.txt')[1]
    .split(',')
  expect(day13.earliestSpecialTimestamp(input)).toBe(24)
  */
})
