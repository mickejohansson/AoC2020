const parseCups = (labels: number[]): Map<number, number> => {
  const map: Map<number, number> = new Map()
  labels.forEach((l, index) => {
    map.set(l, labels[(index + 1) % labels.length])
  })

  return map
}

const toString = (cups: Map<number, number>, cup: number, delimeter: string = ''): string => {
  let s = '' + cup
  let next = cups.get(cup)
  while (next !== undefined && next !== cup) {
    s += delimeter
    s += next
    next = cups.get(next)
  }

  return s
}

const removeAfter = (map: Map<number, number>, cup:number, nbrCups: number): number => {
  let first = map.get(cup)
  let last = first
  for (let i=0; i<nbrCups - 1; i++) {
    last = map.get(last)
  }

  map.set(cup, map.get(last))
  map.set(last, undefined)

  return first
}

const addAfter = (cups: Map<number, number>, cup: number, newCups: number) => {
  let end = newCups
  while (cups.get(end) !== undefined) {
    end = cups.get(end)
  }

  cups.set(end, cups.get(cup))
  cups.set(cup, newCups)
}

const includes = (cups: Map<number, number>, start: number, toFind: number): boolean => {
  let next = start
  while (next !== undefined) {
    if (next === toFind) {
      return true
    }
    next = cups.get(next)
  }

  return false
}

const play = (input: number[], nbrMoves: number): Map<number, number> => {
  const cups = parseCups(input)
  let currentCup = input[0]
  for (let i = 0; i < nbrMoves; i++) {
    // Pick up the three next cups
    const removed = removeAfter(cups, currentCup, 3)

    // Find the destination
    let destination = currentCup
    while (destination === currentCup || includes(cups ,removed, destination)) {
      destination--
      if (destination < 1) {
        destination = input.length
      }
    }

    // Add removed cups
    addAfter(cups, destination, removed)

    currentCup = cups.get(currentCup)
  }

  return cups
}

export default { parseCups, removeAfter, addAfter, toString, play }