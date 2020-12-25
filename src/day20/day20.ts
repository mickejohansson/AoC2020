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
      if (borders[Side.TOP] === topBorder && borders[Side.LEFT] === leftBorder) {
        return {
          tile,
          borders
        }
      }
    }
  }

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

  const sides = getSides(tiles)


  const width = Math.sqrt(tiles.length)
  const map: MatchedTile[][] = []
  for(let y = 0; y < width; y++) {
    const row = []
    for(let x = 0; x < width; x++) { 
      const left = x > 0 ? row[x-1].borders[Side.RIGHT] : -1
      const top = y > 0 ? map[y-1][x].borders[Side.BOTTOM] : -1
      const matchedTile = matchTile(top, left, tiles, sides)
      tiles = removeTile(matchedTile.tile, tiles)
      row.push(matchedTile)
    }
    map.push(row)
  }

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

  return image
}

const rotateImage = (image: string[]) => {
  return image.map(line => line.split(''))[0].map((_, index) => image.map(row => row[index]).reverse()).map(row => row.join(''))
}

const flipImage = (image: string[]): string[] => {
  return image.map(row => row.split('').reverse()).map(row => row.join(''))
}

const findAllMonsters = (regex: RegExp, image: string): number => {
  let match = regex.exec(image)
  let nbrMatches = 0
  while (match) {
    nbrMatches++
    regex.lastIndex = match.index + 1
    match = regex.exec(image)
  }
  return nbrMatches
}

const findMonsters = (image: string[]): number => {
  const regex = new RegExp('#[#.]{'+ (image[0].length - 19) +'}#[#.]{4}##[#.]{4}##[#.]{4}###[#.]{'+ (image[0].length - 19) +'}#([#.]{2}#){5}', 'g')
  for(let i=0; i<4; i++) {
    image = rotateImage(image)
    let matches = image.join('').match(regex)
    if (matches) {
      return findAllMonsters(regex, image.join(''))
    }
  }
  image = flipImage(image)
  for(let i=0; i<4; i++) {
    image = rotateImage(image)
    let matches = image.join('').match(regex)
    if (matches) {
      return findAllMonsters(regex, image.join(''))
    }
  }

  return 0
}

const roughness = (image: string[]): number => {
  const nbrMatches = findMonsters(image)
  return image.flatMap(line => line.split('')).filter(s => s === '#').length - nbrMatches * 15
}

export default { parseTiles, rotateCW, flipHorizontal, getBorders, buildMap, cornerProduct, getImage, roughness }
