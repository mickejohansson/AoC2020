import day13, { Departure } from './day13'

test('it finds the nearest bus to catch', () => {
  let departure: Departure = day13.earliestDeparture(
    __dirname + '/testInput.txt'
  )
  expect(departure.busId * departure.waitTime).toBe(295)

  departure = day13.earliestDeparture(__dirname + '/input.txt')
  expect(departure.busId * departure.waitTime).toBe(138)
})
