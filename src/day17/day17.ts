import fileReader from '../util/fileReader'

interface Cube {
  x: number
  y: number
  z: number

  active: boolean
  activeNeighbours: number
}

const hash = (x: number, y: number, z: number): string => {
  return x + ':' + y + ':' + z
}

const addEmptyIfMissing = (
  x: number,
  y: number,
  z: number,
  map: Map<string, Cube>
) => {
  const key = hash(x, y, z)
  if (!map.has(key)) {
    map.set(key, { x, y, z, active: false, activeNeighbours: 0 })
  }
}

const notifyNeighbours = (
  x: number,
  y: number,
  z: number,
  turnedActive: boolean,
  map: Map<string, Cube>
) => {
  //console.log('------ Checking for: x:' + x + ' y:' + y + ' z:' + z)
  for (let dX = -1; dX <= 1; dX++) {
    for (let dY = -1; dY <= 1; dY++) {
      for (let dZ = -1; dZ <= 1; dZ++) {
        const newX = x + dX
        const newY = y + dY
        const newZ = z + dZ
        if (!(dX === 0 && dY === 0 && dZ === 0)) {
          //console.log('Checking: x:' + dX + ' y:' + dY + ' z:' + dZ)
          const key = hash(newX, newY, newZ)
          const cube = map.get(key)
          if (turnedActive) {
            if (!cube) {
              map.set(key, {
                x: newX,
                y: newY,
                z: newZ,
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

const update = (
  x: number,
  y: number,
  z: number,
  active: boolean,
  map: Map<string, Cube>
) => {
  const key = hash(x, y, z)
  const existingCube = map.get(key)
  const wasActive = existingCube ? existingCube.active : false
  const activeNeighbours = existingCube ? existingCube.activeNeighbours : 0

  if (active && !wasActive) {
    // Cube has turned active
    notifyNeighbours(x, y, z, true, map)
  } else if (wasActive && !active) {
    // Cube has turned inactive
    notifyNeighbours(x, y, z, false, map)
  }

  map.set(key, { x, y, z, active, activeNeighbours })
}

const parse = (path: string): Map<string, Cube> => {
  const map: Map<string, Cube> = new Map()

  fileReader.readStringArray(path).map((row, y) =>
    row.split('').forEach((char, x) => {
      if (char === '#') {
        update(x, y, 0, true, map)
      }
    })
  )

  console.log('Map', map)
  return map
}

const runCycle = (map: Map<string, boolean>) => {
  const newMap: Map<string, boolean> = new Map()
  map.forEach((isActive, hash) => {
    const coordinates = hash.split(':')
  })
}

export default { parse, hash }
