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
  const tiles = day20.parseTiles(__dirname + '/testInput.txt')
  const tile: Tile = {
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
  expect(tiles[0]).toMatchObject(tile)
})

test('it rotates a tile', () => {
  const tile: Tile = {
    id: 1234,
    data: [],
    borders: [1, 2, 3, 4]
  }
  day20.rotateCW(tile)
  expect(tile.borders).toMatchObject([4, 1, 2, 3])
})

test('it builds the map', () => {
  expect(day20.buildMap(__dirname + '/testInput.txt').length).toBe(3)
})
