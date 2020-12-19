import day17 from './day17'

test('it parses the input', () => {
  const map = day17.parse(__dirname + '/testInput.txt')
  expect(map.get(day17.hash(1, 0, 0)).active).toBe(true)
  expect(map.get(day17.hash(2, 1, 0)).active).toBe(true)
  expect(map.get(day17.hash(0, 2, 0)).active).toBe(true)
  expect(map.get(day17.hash(1, 2, 0)).active).toBe(true)
  expect(map.get(day17.hash(2, 2, 0)).active).toBe(true)

  expect(map.get(day17.hash(0, 0, -1)).active).toBe(false)
  expect(map.get(day17.hash(0, 0, -1)).activeNeighbours).toBe(1)

  expect(map.get(day17.hash(1, 1, -1)).active).toBe(false)
  expect(map.get(day17.hash(1, 1, -1)).activeNeighbours).toBe(5)

  expect(map.get(day17.hash(2, 1, 1)).active).toBe(false)
  expect(map.get(day17.hash(2, 1, 1)).activeNeighbours).toBe(4)
})
