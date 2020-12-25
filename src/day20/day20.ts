import fileReader from '../util/fileReader'
import * as _ from 'lodash'

export enum Side {
  TOP = 0,
  RIGHT,
  BOTTOM,
  LEFT
}

export interface Tile {
  id: number
  data: string[][]
}

const parseTiles = (path: string): Tile[] => {
  return fileReader
    .readStringArray(path, '\n\n')
    .map((chunk) => chunk.split('\n'))
    .map((tileInfo) => {
      const id = parseInt(tileInfo[0].match(/Tile (\d+):/)[1])
      const data = tileInfo.slice(1).map((row) => row.split(''))
      return {
        id,
        data,
      }
    })
}

const rotateCW = (tile: Tile): Tile => {
  return {
      id: tile.id,
      data: tile.data[0].map((_, index) => tile.data.map(row => row[index]).reverse())
    }
}

const flipHorizontal = (tile: Tile): Tile => {
  return {
    id: tile.id,
    data: tile.data.map(row => Array.from(row).reverse())
  }
}

const fromBinary = (bin: string[]): number => {
  return parseInt(bin.join(''), 2)
}

const getBorders = (tile: Tile): number[] => {
  const bin: string[][] = tile.data.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  return [
    fromBinary(bin[0]), // TOP
    fromBinary(bin.map((row) => row[row.length - 1])), // RIGHT
    fromBinary(bin[bin.length - 1].map((c) => c)), // BOTTOM
    fromBinary(
      bin
        .map((row) => row[0])
        .map((c) => c)
    ) // LEFT 
  ]
}

const findMatching = (tile: Tile, side: Side, tiles: Tile[]): Tile => {
  const tileBorders = getBorders(tile)
  for(let i=0; i<tiles.length; i++) {
    let t = tiles[i]
    if (t.id !== tile.id) {
      let borders = getBorders(t)
      if (borders.includes(tileBorders[side])) {
        return t
      }
      t = flipHorizontal(t)
      t = rotateCW(t)
      borders = getBorders(t)
      if (borders.includes(tileBorders[side])) {
        return t
      }
    }
  }

  return undefined
}

const findNeighbours = (tile: Tile, tiles: Tile[]): Tile[] => {
  return [
    findMatching(tile, Side.TOP, tiles),
    findMatching(tile, Side.RIGHT, tiles),
    findMatching(tile, Side.BOTTOM, tiles),
    findMatching(tile, Side.LEFT, tiles),
  ]
}

const findCorners = (tiles: Tile[]): Tile[] => {
  return tiles.filter(t => findNeighbours(t, tiles)
                  .filter(n => n !== undefined).length === 2)
}

const cornerProduct = (path: string): number => {
  const tiles = parseTiles(path)
  return findCorners(tiles).map(t => t.id).reduce((acc, curr) => acc * curr, 1)
}

const buildMap = (path: string): Tile[][] => {
  const tiles = parseTiles(path)

  const corners = findCorners(tiles)
  console.log('corners', corners)


  return undefined
}

export default { parseTiles, rotateCW, flipHorizontal, getBorders, buildMap, cornerProduct }

/*
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
*/
