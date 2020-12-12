import day12 from './day12'

test('it finds the manhattan distancep', () => {
  expect(day12.manhattan(__dirname + '/testInput.txt')).toBe(25)
  expect(day12.manhattan(__dirname + '/input.txt')).toBe(1294)
})

test('it rotates a point', () => {
  expect(day12.rotate(1, 0, 90)).toMatchObject([0, -1])
  expect(day12.rotate(1, 0, -90)).toMatchObject([0, 1])
  expect(day12.rotate(1, 1, -90)).toMatchObject([-1, 1])
  expect(day12.rotate(-1, -1, 90)).toMatchObject([-1, 1])
  expect(day12.rotate(10, 1, 90)).toMatchObject([1, -10])
  expect(day12.rotate(10, 4, 90)).toMatchObject([4, -10])
})

test('it finds the manhattan distancep after following a waypoint', () => {
  expect(day12.manhattanWaypoint(__dirname + '/testInput.txt')).toBe(286)
  expect(day12.manhattanWaypoint(__dirname + '/input.txt')).toBe(20592)
})
