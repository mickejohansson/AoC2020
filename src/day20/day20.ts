import fileReader from '../util/fileReader'

interface Tile {
  id: number
  data: string[][]
  edges: Edges
}

const toBinary = (bin: string[]): number => {
  return parseInt(bin.join(''), 2)
}

interface Edges {
  normal: number[]
  reversed: number[]
}

const getEdges = (tileData: string[][]): Edges => {
  const bin: string[][] = tileData.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  const top = bin[0]
  const bottom = bin[bin.length - 1]
  const left = bin.map((row) => row[0])
  const right = bin.map((row) => row[row.length - 1])

  const normal: number[] = []
  normal.push(toBinary(top))
  normal.push(toBinary(bottom))
  normal.push(toBinary(left))
  normal.push(toBinary(right))

  const reversed: number[] = []
  reversed.push(toBinary(top.reverse()))
  reversed.push(toBinary(bottom.reverse()))
  reversed.push(toBinary(left.reverse()))
  reversed.push(toBinary(right.reverse()))

  return { normal, reversed }
}

const hasMatchingEdge = (tile1: Tile, tile2: Tile): boolean => {
  const tile1Edges = tile1.edges.normal.concat(tile1.edges.reversed)
  for (let i = 0; i < tile1Edges.length; i++) {
    for (let j = 0; j < tile2.edges.normal.length; j++) {
      if ((tile1Edges[i] ^ tile2.edges.normal[j]) === 0) {
        return true
      }
    }
  }

  return false
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

export default { cornerProduct }
