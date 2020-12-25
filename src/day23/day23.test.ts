import day23 from './day23'

test('it prints cups', () => {
  let cups = day23.parseCups('253149867'.split('').map(s => parseInt(s)))
  expect(day23.toString(cups, 3)).toBe('314986725')
})

test('it parses cups', () => {
  const cups = day23.parseCups('253149867'.split('').map(s => parseInt(s)))
  expect(cups.size).toBe(9)
  expect(cups.get(2)).toBe(5)
  expect(cups.get(1)).toBe(4)
  expect(cups.get(7)).toBe(2)
  expect(day23.toString(cups, 3)).toBe('314986725')
})

test('it removes cups', () => {
  let cups = day23.parseCups('253149867'.split('').map(s => parseInt(s)))
  const removed = day23.removeAfter(cups, 4, 3)
  expect(cups.get(4)).toBe(7)
  expect(removed).toBe(9)
  expect(cups.get(9)).toBe(8)
  expect(cups.get(8)).toBe(6)
  expect(cups.get(6)).toBe(undefined)
  expect(day23.toString(cups, removed)).toBe('986')
  expect(day23.toString(cups, 2)).toBe('253147')
})

test('it adds cups', () => {
  const cups = day23.parseCups('253149867'.split('').map(s => parseInt(s)))
  const removed = day23.removeAfter(cups, 6, 3)
  expect(day23.toString(cups, removed)).toBe('725')
  expect(day23.toString(cups, 3)).toBe('314986')
  day23.addAfter(cups, 3, removed)
  expect(day23.toString(cups, 2)).toBe('251498637')
  expect(day23.toString(cups, removed)).toBe('725149863')
})

test('it plays 10 rounds of the game', () => {
  const cups = day23.play('389125467'.split('').map(s => parseInt(s)), 10)
  expect(day23.toString(cups, 1).substring(1)).toBe('92658374')
})

test('it plays 100 rounds of the game', () => {
  let cups = day23.play('389125467'.split('').map(s => parseInt(s)), 100)
  expect(day23.toString(cups, 1).substring(1)).toBe('67384529')

  cups = day23.play('253149867'.split('').map(s => parseInt(s)), 100)
  expect(day23.toString(cups, 1).substring(1)).toBe('34952786')
})

test('it plays many rounds of the game on test data', () => {
  const input = '389125467'.split('').map(s => parseInt(s))
  for(let i=10; i<=1000000; i++) {
    input.push(i)
  }
  const cups = day23.play(input, 10000000)
  const secondCup = cups.get(1)
  const thirdCup = cups.get(secondCup)
  expect(secondCup * thirdCup).toBe(149245887792)
})

test('it plays many rounds of the game on real data', () => {
  const input = '253149867'.split('').map(s => parseInt(s))
  for(let i=10; i<=1000000; i++) {
    input.push(i)
  }
  const cups = day23.play(input, 10000000)
  const secondCup = cups.get(1)
  const thirdCup = cups.get(secondCup)
  expect(secondCup * thirdCup).toBe(505334281774)
})