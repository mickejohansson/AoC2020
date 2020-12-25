export interface Coordinate {
  x: number
  y:number
}

const add =(c1:Coordinate, c2: Coordinate): Coordinate => {
  return { x: c1.x + c2.x, y: c1.y + c2.y}
}

const hash = (coordinate: Coordinate): string => {
  return coordinate.x + ':' + coordinate.y
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

const flipTiles = (lines: string[]): number => {
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

  let nbrFlipped = 0
  tiles.forEach(val => {
    if (val) {
      nbrFlipped++
    }
  })

  return nbrFlipped
}

export default { tileCoordinate, flipTiles }