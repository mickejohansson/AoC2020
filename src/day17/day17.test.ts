import day17 from './day17'

test('it parses the input', () => {
  const map = day17.parse(__dirname + '/testInput.txt')
  expect(map.get(day17.hash(1, 0, 0, 0)).active).toBe(true)
  expect(map.get(day17.hash(2, 1, 0, 0)).active).toBe(true)
  expect(map.get(day17.hash(0, 2, 0, 0)).active).toBe(true)
  expect(map.get(day17.hash(1, 2, 0, 0)).active).toBe(true)
  expect(map.get(day17.hash(2, 2, 0, 0)).active).toBe(true)

  expect(map.get(day17.hash(0, 0, -1, 0)).active).toBe(false)
  expect(map.get(day17.hash(0, 0, -1, 0)).activeNeighbours).toBe(1)

  expect(map.get(day17.hash(1, 1, -1, 0)).active).toBe(false)
  expect(map.get(day17.hash(1, 1, -1, 0)).activeNeighbours).toBe(5)

  expect(map.get(day17.hash(2, 1, 1, 0)).active).toBe(false)
  expect(map.get(day17.hash(2, 1, 1, 0)).activeNeighbours).toBe(4)
})

test('it runs 2 cycles on the test input', () => {
  let map = day17.parse(__dirname + '/testInput.txt')
  map = day17.runCycle(map)
  expect(day17.nbrActive(map)).toBe(11)
  map = day17.runCycle(map)
  expect(day17.nbrActive(map)).toBe(21)
})

test('it runs 2 cycles on the test input considering the fourth dimension', () => {
  let map = day17.parse(__dirname + '/testInput.txt')
  map = day17.runCycle(map, true)
  expect(day17.nbrActive(map)).toBe(29)
  map = day17.runCycle(map, true)
  expect(day17.nbrActive(map)).toBe(60)
})

test('it runs 6 cycles on the real input', () => {
  let map = day17.parse(__dirname + '/input.txt')
  for (let i = 0; i < 6; i++) {
    map = day17.runCycle(map)
  }
  expect(day17.nbrActive(map)).toBe(353)
})

test('it runs 6 cycles on the real input considering the fourth dimension', () => {
  let map = day17.parse(__dirname + '/input.txt')
  for (let i = 0; i < 6; i++) {
    map = day17.runCycle(map, true)
  }
  expect(day17.nbrActive(map)).toBe(2472)
})
