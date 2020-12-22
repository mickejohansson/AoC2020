import fileReader from '../util/fileReader'

/*
enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
  UP_REVERSED,
  RIGHT_REVERSED,
  DOWN_REVERSED,
  LEFT_REVERSED
}

interface Tile {
  id: number
  data: string[][]
  edges: Map<Direction, number>
}

const toBinary = (bin: string[]): number => {
  return parseInt(bin.join(''), 2)
}

const getEdges = (tileData: string[][]): Map<Direction, number> => {
  const bin: string[][] = tileData.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  const top = bin[0]
  const bottom = bin[bin.length - 1]
  const left = bin.map((row) => row[0])
  const right = bin.map((row) => row[row.length - 1])

  const edges: Map<Direction, number> = new Map()
  edges.set(Direction.UP, toBinary(top))
  edges.set(Direction.RIGHT, toBinary(right))
  edges.set(Direction.DOWN, toBinary(bottom))
  edges.set(Direction.LEFT, toBinary(left))
  edges.set(Direction.UP_REVERSED, toBinary(top.reverse()))
  edges.set(Direction.RIGHT_REVERSED, toBinary(right.reverse()))
  edges.set(Direction.DOWN_REVERSED, toBinary(bottom.reverse()))
  edges.set(Direction.LEFT_REVERSED, toBinary(left.reverse()))

  return edges
}

const hasMatchingEdge = (tile1: Tile, tile2: Tile): boolean => {
  const tile1Edges = Array.from(tile1.edges.values())
  const tile2Edges = Array.from(tile2.edges.values())
  for (let i = 0; i < tile1Edges.length; i++) {
    for (let j = 0; j < tile2Edges.length; j++) {
      if ((tile1Edges[i] ^ tile2Edges[j]) === 0) {
        return true
      }
    }
  }

  return false
}

const parseTiles = (path: string): Tile[] => {
  return fileReader
    .readStringArray(path, '\n\n')
    .map((chunk) => chunk.split('\n'))
    .map((tileInfo) => {
      const id = parseInt(tileInfo[0].match(/Tile (\d+):/)[1])
      const data = tileInfo.slice(1).map((row) => row.split(''))
      const edges = getEdges(data)
      return {
        id,
        data,
        edges
      }
    })
}

const cornerProduct = (path: string): number => {
  const tiles: Tile[] = fileReader
    .readStringArray(path, '\n\n')
    .map((chunk) => chunk.split('\n'))
    .map((tileInfo) => {
      const id = parseInt(tileInfo[0].match(/Tile (\d+):/)[1])
      const data = tileInfo.slice(1).map((row) => row.split(''))
      const edges = getEdges(data)
      return {
        id,
        data,
        edges
      }
    })

  const cornerTiles: Tile[] = []
  for (let i = 0; i < tiles.length; i++) {
    let nbrMatchingCorners = 0
    for (let j = 0; j < tiles.length; j++) {
      if (i !== j) {
        if (hasMatchingEdge(tiles[i], tiles[j])) {
          nbrMatchingCorners++
          if (nbrMatchingCorners >= 3) {
            break
          }
        }
      }
    }
    if (nbrMatchingCorners < 3) {
      cornerTiles.push(tiles[i])
    }
  }

  return cornerTiles.reduce((acc, curr) => acc * curr.id, 1)
}

const findTile = (tile: Tile, tileDirection: Direction, tiles: Tile[]) => {
  for (let t=0; t<tiles.length; t++) {
    const currentTile = tiles[t]
    const currentTileEdges = Array.from(currentTile.edges.entries())
    if (currentTile.id !== tile.id) {
      for (let e=0; e<currentTileEdges.length; e++) {
        const currentEdge = currentTileEdges[e][1]
        if ((currentEdge ^ tile.edges.get(tileDirection)) === 0) {
          return currentTile
        }
      }
    }
  }

  return undefined
}

const arrangeTiles = (path: string): Tile[][] => {
  const tiles = parseTiles(path)
  console.log('tiles', tiles)

  const startTile = tiles[0]
  const leftTile = findTile(startTile, Direction.LEFT, tiles)
  console.log('Matching tiles: ', startTile.id, leftTile.id)
  const mapWidth = Math.sqrt(tiles.length)
  //const leftTile = findMatchingTile(startTile)
  return undefined
}
*/

enum Side {
  TOP = 0,
  RIGHT,
  BOTTOM,
  LEFT
}

export interface Tile {
  id: number
  data: string[][]
  borders: number[]
}

const fromBinary = (bin: string[]): number => {
  return parseInt(bin.join(''), 2)
}

const getBorders = (tileData: string[][]): number[] => {
  const bin: string[][] = tileData.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  return [
    fromBinary(bin[0]), // TOP
    fromBinary(bin[bin.length - 1]), // RIGHT
    fromBinary(bin.map((row) => row[0])), // BOTTOM
    fromBinary(bin.map((row) => row[row.length - 1])) // LEFT
  ]
}

const parseTiles = (path: string): Tile[] => {
  return fileReader
    .readStringArray(path, '\n\n')
    .map((chunk) => chunk.split('\n'))
    .map((tileInfo) => {
      const id = parseInt(tileInfo[0].match(/Tile (\d+):/)[1])
      const data = tileInfo.slice(1).map((row) => row.split(''))
      const borders = getBorders(data)
      return {
        id,
        data,
        borders
      }
    })
}

const rotateCW = (tile: Tile) => {
  const borders = Array.from(tile.borders)
  for (let i = 0; i < borders.length; i++) {
    borders[i] = tile.borders[(i - 1 + 4) % 4]
  }
  tile.borders = borders
}

const flip = (tile: Tile) => {
  const borders = Array.from(tile.borders)
  for (let i = 0; i < borders.length; i++) {
    borders[i] = tile.borders[(i - 1 + 4) % 4]
  }
  tile.borders = borders
}

const buildMap = (path: string): Tile[][] => {
  const tiles = parseTiles(path)
  return undefined
}

export default { parseTiles, buildMap, rotateCW, getBorders }