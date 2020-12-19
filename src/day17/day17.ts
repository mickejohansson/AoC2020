import fileReader from '../util/fileReader'

interface Cube {
  x: number
  y: number
  z: number
  w: number

  active: boolean
  activeNeighbours: number
}

const hash = (x: number, y: number, z: number, w: number): string => {
  return x + ':' + y + ':' + z + ':' + w
}

const notifyNeighbours = (
  x: number,
  y: number,
  z: number,
  w: number,
  turnedActive: boolean,
  map: Map<string, Cube>
) => {
  for (let dX = -1; dX <= 1; dX++) {
    for (let dY = -1; dY <= 1; dY++) {
      for (let dZ = -1; dZ <= 1; dZ++) {
        for (let dW = -1; dW <= 1; dW++) {
          const newX = x + dX
          const newY = y + dY
          const newZ = z + dZ
          const newW = w + dW
          if (!(dX === 0 && dY === 0 && dZ === 0 && dW === 0)) {
            const key = hash(newX, newY, newZ, newW)
            const cube = map.get(key)
            if (turnedActive) {
              if (!cube) {
                map.set(key, {
                  x: newX,
                  y: newY,
                  z: newZ,
                  w: newW,
                  active: false,
                  activeNeighbours: 1
                })
              } else {
                cube.activeNeighbours++
              }
            } else {
              cube.activeNeighbours--
            }
          }
        }
      }
    }
  }
}

const update = (
  x: number,
  y: number,
  z: number,
  w: number,
  active: boolean,
  map: Map<string, Cube>
) => {
  const key = hash(x, y, z, w)
  const existingCube = map.get(key)
  const wasActive = existingCube ? existingCube.active : false
  const activeNeighbours = existingCube ? existingCube.activeNeighbours : 0

  if (active && !wasActive) {
    // Cube has turned active
    notifyNeighbours(x, y, z, w, true, map)
  } else if (wasActive && !active) {
    // Cube has turned inactive
    notifyNeighbours(x, y, z, w, false, map)
  }

  map.set(key, { x, y, z, w, active, activeNeighbours })
}

const parse = (path: string): Map<string, Cube> => {
  const map: Map<string, Cube> = new Map()

  fileReader.readStringArray(path).map((row, y) =>
    row.split('').forEach((char, x) => {
      if (char === '#') {
        update(x, y, 0, 0, true, map)
      }
    })
  )

  return map
}

const nbrActive = (map: Map<string, Cube>): number => {
  let sum = 0
  map.forEach((cube) => {
    if (cube.active) {
      sum++
    }
  })

  return sum
}

const runCycle = (
  map: Map<string, Cube>,
  fourDimensions: boolean = false
): Map<string, Cube> => {
  const newMap: Map<string, Cube> = new Map()
  map.forEach((cube, key) => {
    if (cube.active) {
      if (cube.activeNeighbours === 2 || cube.activeNeighbours === 3) {
        update(
          cube.x,
          cube.y,
          cube.z,
          fourDimensions ? cube.w : 0,
          true,
          newMap
        )
      } else {
        update(
          cube.x,
          cube.y,
          cube.z,
          fourDimensions ? cube.w : 0,
          false,
          newMap
        )
      }
    } else {
      if (cube.activeNeighbours === 3) {
        update(
          cube.x,
          cube.y,
          cube.z,
          fourDimensions ? cube.w : 0,
          true,
          newMap
        )
      } else {
        // Remain inactive
      }
    }
  })

  return newMap
}

export default { parse, hash, runCycle, nbrActive }
