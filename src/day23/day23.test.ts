import day23, { Cup } from './day23'

test('it parses cups', () => {
  const cups = day23.parseCups('253149867')
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(5)
})

test('it removes cups', () => {
  const cups = day23.parseCups('253149867')
  day23.removeAfter(cups, 2)
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(1)
})

test('it adds cups', () => {
  const cups = day23.parseCups('253149867')
  const removed = day23.removeAfter(cups, 2)
  day23.addAfter(cups, removed)
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(5)
  expect(cups.next.next.label).toBe(3)
  expect(cups.next.next.next.label).toBe(1)
  expect(cups.next.next.next.next.label).toBe(4)
})

test('it finds cups', () => {
  const cups = day23.parseCups('253149867')
  const found = day23.find(cups, c => c.label === 8)
  expect(found.label).toBe(8)
  expect(found.next.label).toBe(6)

  const notFound = day23.find(cups, c => c.label === 78)
  expect(notFound).toBe(undefined)
})

/*
test('it plays the game', () => {
  expect(day23.play('253149867', 10)).toBe('92658374')
})
*/