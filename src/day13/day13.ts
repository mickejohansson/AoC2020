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

const earliestSpecialTimestamp = (input: string[]) => {
  const buses: BusInfo[] = input
    .map((s, i) => {
      return {
        busId: s === 'x' ? -1 : parseInt(s),
        index: i
      }
    })
    .filter((busInfo) => busInfo.busId >= 0)

  let timestamp = 1
  let step = 1
  let i = 0
  let success = false
  while (true) {
    //console.log('Testing: ' + i, buses[i])
    if ((timestamp + buses[i].index) % buses[i].busId === 0) {
      success = true
      //console.log('------- Hit: ' + i, timestamp)
      if (i === buses.length - 1) {
        return timestamp
      }

      step = buses[i].busId
      i++
    } else {
      //console.log('Failed: ' + i, timestamp)
      timestamp += step
      i = 0
    }
  }
}

export default { earliestDeparture, earliestSpecialTimestamp }
