import fileReader from '../util/fileReader'

export enum Side {
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
    fromBinary(bin.map((row) => row[row.length - 1])), // RIGHT
    fromBinary(bin[bin.length - 1].map((c) => c).reverse()), // BOTTOM
    fromBinary(
      bin
        .map((row) => row[0])
        .map((c) => c)
        .reverse()
    ) // LEFT
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

// Flip left to right
const flip = (tile: Tile) => {
  const reversedData = tile.data.map((row) => row.reverse())
  const borders = getBorders(reversedData)
  tile.borders = borders
}

const testTile = (tile: Tile, side: Side, currentTile: Tile): Tile => {
  for (let b = 0; b < currentTile.borders.length; b++) {
    if (currentTile.borders[(side + 2) % 4] === tile.borders[side]) {
      return currentTile
    }
    rotateCW(currentTile)
  }
}

const findMatchingTile = (tile: Tile, side: Side, tiles: Tile[]): Tile => {
  for (let i = 0; i < tiles.length; i++) {
    const currentTile = {
      id: tiles[i].id,
      data: Array.from(tiles[i].data.map((row) => Array.from(row))),
      borders: Array.from(tiles[i].borders)
    }
    if (currentTile.id !== tile.id) {
      let foundTile = testTile(tile, side, currentTile)
      if (!foundTile) {
        flip(currentTile)
        foundTile = testTile(tile, side, currentTile)
      }
      if (foundTile) {
        return foundTile
      }
    }
  }
}

const findNeighbours = (tile: Tile, tiles: Tile[]): Tile[] => {
  return [
    findMatchingTile(tile, Side.TOP, tiles),
    findMatchingTile(tile, Side.RIGHT, tiles),
    findMatchingTile(tile, Side.BOTTOM, tiles),
    findMatchingTile(tile, Side.LEFT, tiles)
  ]
}

const cornerProduct = (path: string): number => {
  const tiles = parseTiles(path)
  return tiles
    .filter(
      (tile) =>
        findNeighbours(tile, tiles).filter((n) => n !== undefined).length === 2
    )
    .reduce((acc, curr) => acc * curr.id, 1)
}

const buildMap = (path: string): Tile[][] => {
  const tiles = parseTiles(path)

  return []
}

export default {
  parseTiles,
  buildMap,
  rotateCW,
  flip,
  findMatchingTile,
  cornerProduct
}
