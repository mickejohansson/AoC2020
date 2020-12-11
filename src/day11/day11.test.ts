import fileReader from '../util/fileReader'
import day11 from './day11'

test('it parses a map', () => {
  const map = day11.readMap(__dirname + '/testInput.txt')
  expect(map[0][0]).toBe('L')
  expect(map[4][7]).toBe('.')
  expect(map[8][7]).toBe('L')
})

test('it finds the number occupied adjacent seats', () => {
  const map = day11.readMap(__dirname + '/testInput3Rounds.txt')
  expect(day11.nbrOccupiedAdjacentSeats(5, 5, map)).toBe(3)
  expect(day11.nbrOccupiedAdjacentSeats(8, 2, map)).toBe(3)
  expect(day11.nbrOccupiedAdjacentSeats(0, 0, map)).toBe(1)
})

test('it counts the number of occupied seats', () => {
  const map = day11.readMap(__dirname + '/testInput3Rounds.txt')
  expect(day11.nbrOccupiedSeats(map)).toBe(51)
})

test('it plays one round on the map', () => {
  const map = day11.readMap(__dirname + '/testInput.txt')
  const map1Round = day11.readMap(__dirname + '/testInput1Round.txt')
  const newMap = day11.doRound(map, day11.simpleSeatUpdate)
  expect(newMap).toMatchObject(map1Round)
})

test('it finds the number of occupied seats in the stabilized test map', () => {
  const map = day11.readMap(__dirname + '/testInput.txt')
  const newMap = day11.doRoundsUntilStabilized(map, day11.simpleSeatUpdate)
  expect(day11.nbrOccupiedSeats(newMap)).toBe(37)
})

test('it finds the number of occupied seats in the stabilized map', () => {
  const map = day11.readMap(__dirname + '/input.txt')
  const newMap = day11.doRoundsUntilStabilized(map, day11.simpleSeatUpdate)
  expect(day11.nbrOccupiedSeats(newMap)).toBe(2316)
})
