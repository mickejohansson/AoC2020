import fileReader from '../util/fileReader'

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

interface Tile {
  id: number
  data: string[][]
  edges: Edges
}

const toBinary = (bin: string[]): number => {
  return parseInt(bin.join(''), 2)
}

interface Edges {
  normal: Map<Direction, number>
  reversed: Map<Direction, number>
}

const getEdges = (tileData: string[][]): Edges => {
  const bin: string[][] = tileData.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  const top = bin[0]
  const bottom = bin[bin.length - 1]
  const left = bin.map((row) => row[0])
  const right = bin.map((row) => row[row.length - 1])

  const normal: Map<Direction, number> = new Map()
  normal.set(Direction.UP, toBinary(top))
  normal.set(Direction.DOWN, toBinary(bottom))
  normal.set(Direction.LEFT, toBinary(left))
  normal.set(Direction.RIGHT, toBinary(right))

  const reversed: Map<Direction, number> = new Map()
  reversed.set(Direction.UP, toBinary(top.reverse()))
  reversed.set(Direction.DOWN, toBinary(bottom.reverse()))
  reversed.set(Direction.LEFT, toBinary(left.reverse()))
  reversed.set(Direction.RIGHT, toBinary(right.reverse()))

  return { normal, reversed }
}

const hasMatchingEdge = (tile1: Tile, tile2: Tile): boolean => {
  const tile1Edges = Array.from(tile1.edges.normal.values()).concat(
    Array.from(tile1.edges.reversed.values())
  )
  const tile2Edges = Array.from(tile2.edges.normal.values())
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

const arrangeTiles = (path: string): Tile[][] => {
  const tiles = parseTiles(path)
  console.log('tiles', tiles)

  const startTile = tiles[0]
  //const leftTile = findMatchingTile(startTile)
  return undefined
}

export default { cornerProduct, arrangeTiles }
