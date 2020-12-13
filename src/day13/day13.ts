import fileReader from '../util/fileReader'

export interface Departure {
  busId: number
  nearestDeparture: number
  waitTime: number
}

const earliestDeparture = (path: string): Departure => {
  const input = fileReader.readStringArray(path)
  const arrival: number = parseInt(input[0])
  const departures = input[1]
    .split(',')
    .filter((s) => s !== 'x')
    .map((s) => parseInt(s))
    .map((n) => {
      const nearestDeparture = Math.ceil(arrival / n) * n
      const departure: Departure = {
        busId: n,
        nearestDeparture,
        waitTime: nearestDeparture - arrival
      }
      return departure
    })
    .sort((d1, d2) => d1.waitTime - d2.waitTime)

  return departures[0]
}

export default { earliestDeparture }
