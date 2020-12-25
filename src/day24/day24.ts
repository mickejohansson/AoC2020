export interface Coordinate {
  x: number
  y: number
}

const add =(c1:Coordinate, c2: Coordinate): Coordinate => {
  return { x: c1.x + c2.x, y: c1.y + c2.y}
}

const hash = (coordinate: Coordinate): string => {
  return coordinate.x + ':' + coordinate.y
}

const neighbours = (coord: string): string[] => {
  const coordinates = coord.split(':').map(s => parseInt(s))
  const coordinate: Coordinate = { x: coordinates[0], y: coordinates[1]}

  const hashes = []
  directionCoordinates.forEach(val => {
    hashes.push(hash(add(coordinate, val)))
  })

  return hashes
}

const directionCoordinates: Map<string, Coordinate> = new Map()
directionCoordinates.set('se', { x: 1, y: 1}) 
directionCoordinates.set('sw', { x: -1, y: 1}) 
directionCoordinates.set('w', { x: -2, y: 0}) 
directionCoordinates.set('nw', { x: -1, y: -1}) 
directionCoordinates.set('ne', { x: 1, y: -1}) 
directionCoordinates.set('e', { x: 2, y: 0}) 

const tileCoordinate = (line: string): Coordinate  => {
  let coordinate: Coordinate = { x: 0, y:0}
  while (line.length > 0) {
    const direction = line.match(/(se)|(sw)|(w)|(nw)|(ne)|(e)/)[0]
    line = line.substring(direction.length)

    coordinate = add(coordinate, directionCoordinates.get(direction))
  }

  return coordinate
}

const nbrFlipped = (tiles: Map<string, boolean>): number => {
  let nbrFlipped = 0
  tiles.forEach(val => {
    if (val) {
      nbrFlipped++
    }
  })

  return nbrFlipped
}

const flipTiles = (lines: string[]): Map<string, boolean> => {
  const tiles: Map<string, boolean> = new Map()

  lines.forEach(line => {
    const coordinate = tileCoordinate(line)
    const hashed = hash(coordinate)
    if (!tiles.has(hashed)) {
      tiles.set(hashed, true)
    } else {
      tiles.set(hashed, !tiles.get(hashed))
    }
  })

  return tiles
}


const flipDay = (tiles: Map<string, boolean>): Map<string, boolean> => {
  const newTiles: Map<string, boolean> = new Map()

  tiles.forEach((flipped, hashed) => {

    // Add all the surrounding neighbours
    if (flipped) {
      neighbours(hashed).forEach(n => {
        if (!tiles.has(n)) {
          tiles.set(n, false)
        }
      })
    }
  })

  tiles.forEach((flipped, hashed) => {
    const nbrFlippedNeighbours = neighbours(hashed).filter(h => tiles.has(h) && tiles.get(h) === true).length

    if (flipped && (nbrFlippedNeighbours === 0 || nbrFlippedNeighbours > 2)) {
      newTiles.set(hashed, false)
    } else if (!flipped && nbrFlippedNeighbours === 2) {
      newTiles.set(hashed, true)
    } else {
      newTiles.set(hashed, flipped)
    }
  })

  return newTiles

  return tiles
}

export default { tileCoordinate, flipTiles, nbrFlipped, flipDay }