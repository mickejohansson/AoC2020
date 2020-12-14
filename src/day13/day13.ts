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

interface BusInfo {
  busId: number
  index: number
}

const leastCommonMultiplier = (n1, n2) => {
  const large = Math.max(n1, n2)
  const small = Math.min(n1, n2)

  let i = large
  while (i % small !== 0) {
    i += large
  }

  return i
}

const earliestSpecialTimestamp = (input: string[]) => {
  const buses: BusInfo[] = input
    .map((s, i) => {
      return {
        busId: s === 'x' ? -1 : parseInt(s),
        index: i
      }
    })
    .filter((busInfo) => busInfo.busId >= 0)

  let timestamp = 0
  let step = buses[0].busId
  let i = 2
  while (true) {
    if (buses.slice(0, i).every((b) => (timestamp + b.index) % b.busId === 0)) {
      if (i === buses.length) {
        return timestamp
      }
      step = leastCommonMultiplier(buses[i - 1].busId, step)
      i++
    } else {
      timestamp += step
    }
  }
}

export default { earliestDeparture, earliestSpecialTimestamp }
