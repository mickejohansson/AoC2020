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

const getBorders = (tile: Tile, excludeBorders: number[] = []): number[] => {
  const bin: string[][] = tile.data.map((row) =>
    row.map((c) => (c === '#' ? '1' : '0'))
  )

  const top = fromBinary(bin[0])
  const right = fromBinary(bin.map((row) => row[row.length - 1]))
  const bottom = fromBinary(bin[bin.length - 1].map((c) => c))
  const left = fromBinary(bin
        .map((row) => row[0])
        .map((c) => c))

  return [
    excludeBorders.includes(top) ? -1 : top,
    excludeBorders.includes(right) ? -1 : right,
    excludeBorders.includes(bottom) ? -1 : bottom,
    excludeBorders.includes(left) ? -1 : left
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

interface MatchedTile {
  tile: Tile
  borders: number[]
}

const matchTile = (topBorder: number, leftBorder: number, tiles: Tile[], sideBorders: number[]): MatchedTile => {
  for(let i=0; i<tiles.length; i++) {
    let tile = tiles[i]
    for(let r=0; r<4; r++) {
      tile = rotateCW(tile)
      const borders = getBorders(tile, sideBorders)
      //console.log('Checking border for ' + tile.id, borders)
      if (borders[Side.TOP] === topBorder && borders[Side.LEFT] === leftBorder) {
        return {
          tile,
          borders
        }
      }
    }
    tile = flipHorizontal(tile)
    for(let r=0; r<4; r++) {
      tile = rotateCW(tile)
      const borders = getBorders(tile, sideBorders)
      //console.log('Checking inv border for ' + tile.id, borders)
      if (borders[Side.TOP] === topBorder && borders[Side.LEFT] === leftBorder) {
        return {
          tile,
          borders
        }
      }
    }
  }

  console.log('Failed finding match for top: ' + topBorder + ' left: ' + leftBorder)
  return undefined
}

const increaseCount = (map: Map<number, number>, borders: number[]) => {
  borders.forEach(b => {
    const count = map.get(b)
    if (count) {
      map.set(b, count + 1)
    } else {
      map.set(b, 1)
    }
  })
}

const getSides = (tiles: Tile[]): number[] => {
  const borders: Map<number, number> = new Map()
  tiles.forEach(tile => {
    let b = getBorders(tile)
    increaseCount(borders, b)
    tile = flipHorizontal(tile)
    tile = rotateCW(tile)
    b = getBorders(tile)
    increaseCount(borders, b)
  })

  return Array.from(borders).filter(entry => entry[1] === 1).map(entry => entry[0])
}

const removeTile = (tile: Tile, tiles: Tile[]): Tile[] => {
  const index = tiles.findIndex(t => t.id === tile.id)
  tiles.splice(index, 1)
  return tiles
}

const buildMap = (path: string): MatchedTile[][] => {
  let tiles = parseTiles(path)

  //const corners = findCorners(tiles)
  //console.log('corners', corners)

  const sides = getSides(tiles)
  console.log('sides', sides)


  const width = Math.sqrt(tiles.length)
  const map: MatchedTile[][] = []
  for(let y = 0; y < width; y++) {
    const row = []
    for(let x = 0; x < width; x++) { 
      //console.log('checking ' + x + ':' + y)
      const left = x > 0 ? row[x-1].borders[Side.RIGHT] : -1
      const top = y > 0 ? map[y-1][x].borders[Side.BOTTOM] : -1
      const matchedTile = matchTile(top, left, tiles, sides)
      //console.log('Fit for left: ' + left + ' top: ' + top, matchedTile)
      tiles = removeTile(matchedTile.tile, tiles)
      //console.log('length', tiles.length)
      row.push(matchedTile)
    }
    map.push(row)
  }
  console.log('map', map)


  return map
}

const getImage = (path: string): string[] => {
  const map = buildMap(path)

  let image: string[] = []
  let rowNbr = 0 
  for(let y=0; y<map.length; y++) {
    for(let x=0; x<map.length; x++) {
      const data = map[y][x].tile.data
      for (let col=1; col<data.length - 1; col++) {
        if (!image[rowNbr + col]) {
          image[rowNbr + col] = ''
        }
        image[rowNbr + col] += data[col].slice(1, -1).join('') //'|col ' + col + ' x: ' + x + ' y: ' + y + '|'
      }
    }
    rowNbr += 8 
  }

  // TODO fix!
  image = image.slice(1)
  console.log('image', image)

  return image
}

const roughness = (image: string[]): number => {
  const regex = new RegExp('#[#.]{'+ (image[0].length - 19) +'}#[#.]{4}##[#.]{4}##[#.]{4}###[#.]{'+ (image[0].length - 19) +'}#([#.]{2}#){5}', 'g')
  const matches = image.join('').match(regex)
  console.log('matches', matches)
  return image.flatMap(line => line.split('')).filter(s => s === '#').length - matches.length * 15
}

export default { parseTiles, rotateCW, flipHorizontal, getBorders, buildMap, cornerProduct, getImage, roughness }

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
