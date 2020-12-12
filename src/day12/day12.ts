import fileReader from '../util/fileReader'

interface Instruction {
  action: string
  value: number
}

interface Boat {
  long: number // E-W
  lat: number // N-S
  heading: number // degrees
}

const instructions = (path: string): Instruction[] => {
  return fileReader.readStringArray(path).map((line) => {
    const instruction: Instruction = {
      action: line.charAt(0),
      value: parseInt(line.substring(1))
    }
    return instruction
  })
}

const manhattan = (path: string): number => {
  const boat = instructions(path).reduce(
    (acc: Boat, curr) => {
      switch (curr.action) {
        case 'N':
          acc.lat += curr.value
          break
        case 'S':
          acc.lat -= curr.value
          break
        case 'E':
          acc.long += curr.value
          break
        case 'W':
          acc.long -= curr.value
          break
        case 'L':
          acc.heading = (acc.heading - curr.value) % 360
          break
        case 'R':
          acc.heading = (acc.heading + curr.value) % 360
          break
        case 'F':
          acc.lat += Math.round(
            Math.cos((acc.heading * Math.PI) / 180) * curr.value
          )
          acc.long += Math.round(
            Math.sin((acc.heading * Math.PI) / 180) * curr.value
          )
          break
      }
      return acc
    },
    { long: 0, lat: 0, heading: 90 }
  )

  return Math.abs(boat.lat) + Math.abs(boat.long)
}

interface BoatPosition {
  long: number // E-W
  lat: number // N-S
  waypoint: {
    long: number
    lat: number
  }
}

const rotate = (x: number, y: number, degrees: number): number[] => {
  const newPos: number[] = []
  const rads = (-degrees * Math.PI) / 180
  newPos[0] = Math.round(x * Math.cos(rads) - y * Math.sin(rads))
  newPos[1] = Math.round(y * Math.cos(rads) + x * Math.sin(rads))

  return newPos
}

const manhattanWaypoint = (path: string): number => {
  const boat: BoatPosition = instructions(path).reduce(
    (acc: BoatPosition, curr) => {
      switch (curr.action) {
        case 'N':
          acc.waypoint.lat += curr.value
          break
        case 'S':
          acc.waypoint.lat -= curr.value
          break
        case 'E':
          acc.waypoint.long += curr.value
          break
        case 'W':
          acc.waypoint.long -= curr.value
          break
        case 'L':
          const leftRotatedPoint = rotate(
            acc.waypoint.long,
            acc.waypoint.lat,
            -curr.value
          )
          acc.waypoint.long = leftRotatedPoint[0]
          acc.waypoint.lat = leftRotatedPoint[1]
          break
        case 'R':
          const rightRotadedPoint = rotate(
            acc.waypoint.long,
            acc.waypoint.lat,
            curr.value
          )
          acc.waypoint.long = rightRotadedPoint[0]
          acc.waypoint.lat = rightRotadedPoint[1]
          break
        case 'F':
          acc.lat += curr.value * acc.waypoint.lat
          acc.long += curr.value * acc.waypoint.long
          break
      }
      return acc
    },
    { long: 0, lat: 0, waypoint: { long: 10, lat: 1 } }
  )

  return Math.abs(boat.lat) + Math.abs(boat.long)
}

export default { manhattan, manhattanWaypoint, rotate }
