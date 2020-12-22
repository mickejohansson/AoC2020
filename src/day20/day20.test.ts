import day20, { Tile } from './day20'

/*
test('it arranges the tiles and calculates the product of the corner ids', () => {
  expect(day20.cornerProduct(__dirname + '/testInput.txt')).toBe(20899048083289)
  expect(day20.cornerProduct(__dirname + '/input.txt')).toBe(28057939502729)
})

test('it arranges the tiles', () => {
  expect(day20.arrangeTiles(__dirname + '/testInput.txt')).toMatchObject([])
})
*/
test('it parses tiles', () => {
  const testTile: Tile = {
    borders: [210, 89, 924, 318],
    data: [
      ['.', '.', '#', '#', '.', '#', '.', '.', '#', '.'],
      ['#', '#', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['#', '.', '.', '.', '#', '#', '.', '.', '#', '.'],
      ['#', '#', '#', '#', '.', '#', '.', '.', '.', '#'],
      ['#', '#', '.', '#', '#', '.', '#', '#', '#', '.'],
      ['#', '#', '.', '.', '.', '#', '.', '#', '#', '#'],
      ['.', '#', '.', '#', '.', '#', '.', '.', '#', '#'],
      ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '#', '#', '.', '.', '.', '#', '.', '#', '.'],
      ['.', '.', '#', '#', '#', '.', '.', '#', '#', '#']
    ],
    id: 2311
  }

  const tiles = day20.parseTiles(__dirname + '/testInput.txt')
  expect(tiles[0]).toMatchObject(testTile)
})

test('it rotates a tile', () => {
  const testTile: Tile = {
    borders: [210, 89, 924, 318],
    data: [
      ['.', '.', '#', '#', '.', '#', '.', '.', '#', '.'],
      ['#', '#', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['#', '.', '.', '.', '#', '#', '.', '.', '#', '.'],
      ['#', '#', '#', '#', '.', '#', '.', '.', '.', '#'],
      ['#', '#', '.', '#', '#', '.', '#', '#', '#', '.'],
      ['#', '#', '.', '.', '.', '#', '.', '#', '#', '#'],
      ['.', '#', '.', '#', '.', '#', '.', '.', '#', '#'],
      ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '#', '#', '.', '.', '.', '#', '.', '#', '.'],
      ['.', '.', '#', '#', '#', '.', '.', '#', '#', '#']
    ],
    id: 2311
  }
  day20.rotateCW(testTile)
  expect(testTile.borders).toMatchObject([318, 210, 89, 924])
})

test('it flips a tile', () => {
  const testTile: Tile = {
    borders: [210, 89, 924, 318],
    data: [
      ['.', '.', '#', '#', '.', '#', '.', '.', '#', '.'],
      ['#', '#', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['#', '.', '.', '.', '#', '#', '.', '.', '#', '.'],
      ['#', '#', '#', '#', '.', '#', '.', '.', '.', '#'],
      ['#', '#', '.', '#', '#', '.', '#', '#', '#', '.'],
      ['#', '#', '.', '.', '.', '#', '.', '#', '#', '#'],
      ['.', '#', '.', '#', '.', '#', '.', '.', '#', '#'],
      ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '#', '#', '.', '.', '.', '#', '.', '#', '.'],
      ['.', '.', '#', '#', '#', '.', '.', '#', '#', '#']
    ],
    id: 2311
  }
  day20.flip(testTile)
  expect(testTile.borders).toMatchObject([300, 498, 231, 616])
})

test('it builds the map', () => {
  expect(day20.buildMap(__dirname + '/testInput.txt').length).toBe(3)
})
