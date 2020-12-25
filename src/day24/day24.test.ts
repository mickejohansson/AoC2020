import fileReader from '../util/fileReader'
import day24, { Coordinate } from './day24'

test('it gets a tile coordinate', () => {
  const testCoordinate: Coordinate = { x:0, y: 0}
  expect(day24.tileCoordinate('nwwswee')).toMatchObject(testCoordinate)
})

test('it flips tiles', () => {
  let lines = fileReader.readStringArray(__dirname + '/testInput.txt')
  expect(day24.flipTiles(lines)).toBe(10)

  lines = fileReader.readStringArray(__dirname + '/input.txt')
  expect(day24.flipTiles(lines)).toBe(322)
})