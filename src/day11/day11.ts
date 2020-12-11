import fileReader from '../util/fileReader'

// Parses map in the form of string[row][column]
const readMap = (path: string): string[][] => {
  return fileReader.readStringArray(path).map((row) => row.split(''))
}

const nbrOccupiedAdjacentSeats = (
  rowIndex: number,
  colIndex: number,
  map: string[][]
): number => {
  let result = 0
  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let col = colIndex - 1; col <= colIndex + 1; col++) {
      if (
        !(col === colIndex && row === rowIndex) &&
        map[row] !== undefined &&
        map[row][col] === '#'
      ) {
        result++
      }
    }
  }

  return result
}

const isEqual = (map1: string[][], map2: string[][]): boolean => {
  for (let row = 0; row < map1.length; row++) {
    for (let col = 0; col < map1[0].length; col++) {
      if (map1[row][col] !== map2[row][col]) {
        return false
      }
    }
  }

  return true
}

const nbrOccupiedSeats = (map: string[][]): number => {
  let result = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === '#') {
        result++
      }
    }
  }

  return result
}

const doRound = (map: string[][]): string[][] => {
  const newMap: string[][] = []
  for (let row = 0; row < map.length; row++) {
    const newRow = []
    for (let col = 0; col < map[0].length; col++) {
      const nbrOccupied = nbrOccupiedAdjacentSeats(row, col, map)
      const current = map[row][col]
      if (current === '.') {
        newRow.push('.')
      } else if (current === 'L' && nbrOccupied === 0) {
        newRow.push('#')
      } else if (current === '#' && nbrOccupied >= 4) {
        newRow.push('L')
      } else {
        newRow.push(current)
      }
    }
    newMap.push(newRow)
  }

  return newMap
}

const doRoundsUntilStabilized = (map: string[][]): string[][] => {
  let stabilized = false
  while (!stabilized) {
    const newMap = doRound(map)
    stabilized = isEqual(newMap, map)
    map = newMap
  }

  return map
}

export default {
  readMap,
  doRound,
  nbrOccupiedAdjacentSeats,
  nbrOccupiedSeats,
  doRoundsUntilStabilized
}
