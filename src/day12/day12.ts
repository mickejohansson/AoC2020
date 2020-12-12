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

const manhattan = (path: string): number => {
  const boat = fileReader
    .readStringArray(path)
    .map((line) => {
      const instruction: Instruction = {
        action: line.charAt(0),
        value: parseInt(line.substring(1))
      }
      return instruction
    })
    .reduce(
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

export default { manhattan }
