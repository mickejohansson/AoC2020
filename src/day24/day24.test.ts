import fileReader from '../util/fileReader'
import day24, { Coordinate } from './day24'

test('it gets a tile coordinate', () => {
  const testCoordinate: Coordinate = { x:0, y: 0}
  expect(day24.tileCoordinate('nwwswee')).toMatchObject(testCoordinate)
})

test('it flips tiles', () => {
  let lines = fileReader.readStringArray(__dirname + '/testInput.txt')
  let tiles = day24.flipTiles(lines)
  expect(day24.nbrFlipped(tiles)).toBe(10)

  lines = fileReader.readStringArray(__dirname + '/input.txt')
  tiles = day24.flipTiles(lines)
  expect(day24.nbrFlipped(tiles)).toBe(322)
})

test('it flips tiles during several days', () => {
  let lines = fileReader.readStringArray(__dirname + '/testInput.txt')
  let tiles = day24.flipTiles(lines)
  expect(day24.nbrFlipped(tiles)).toBe(10)

  for (let i=0; i<100; i++) {
    tiles = day24.flipDay(tiles)
  }
  expect(day24.nbrFlipped(tiles)).toBe(2208)

  lines = fileReader.readStringArray(__dirname + '/input.txt')
  tiles = day24.flipTiles(lines)
  expect(day24.nbrFlipped(tiles)).toBe(322)

  for (let i=0; i<100; i++) {
    tiles = day24.flipDay(tiles)
  }
  expect(day24.nbrFlipped(tiles)).toBe(3831)
})