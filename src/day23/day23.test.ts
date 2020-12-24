import day23, { Cup } from './day23'

test('it parses cups', () => {
  const cups = day23.parseCups('253149867')
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(5)
})

test('it removes cups', () => {
  let cups = day23.parseCups('253149867')
  day23.removeAfter(cups, 2)
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(1)

  cups = day23.parseCups('253149867')
  const cup7 = day23.find(cups, c => c.label === 7)
  expect(cup7).not.toBe(undefined)
  day23.removeAfter(cup7, 3)
  expect(day23.toString(cup7)).toBe('714986')
})

test('it adds cups', () => {
  const cups = day23.parseCups('253149867')
  const removed = day23.removeAfter(cups, 2)
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(1)
  const destination = day23.find(cups, c => c.label === 9)
  day23.addAfter(destination, removed)
  expect(cups.label).toBe(2)
  expect(cups.next.label).toBe(1)
  expect(cups.next.next.label).toBe(4)
  expect(cups.next.next.next.label).toBe(9)
  expect(cups.next.next.next.next.label).toBe(5)
  expect(cups.next.next.next.next.next.label).toBe(3)
  expect(cups.next.next.next.next.next.next.label).toBe(8)
})

test('it finds cups', () => {
  const cups = day23.parseCups('253149867')
  let found = day23.find(cups, c => c.label === 8)
  expect(found.label).toBe(8)
  expect(found.next.label).toBe(6)

  found = day23.find(cups, c => c.label === 7)
  expect(found.label).toBe(7)

  const notFound = day23.find(cups, c => c.label === 78)
  expect(notFound).toBe(undefined)
})

test('it plays 10 rounds of the game', () => {
  expect(day23.play('389125467', 10)).toBe('92658374')
})

test('it plays 100 rounds of the game', () => {
  expect(day23.play('389125467', 100)).toBe('67384529')
  expect(day23.play('253149867', 100)).toBe('34952786')
})