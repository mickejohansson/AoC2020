import { isLabeledStatement } from "typescript"

export interface Cup {
  label: number
  next: Cup
}

const parseCups = (labels: string): Cup => {
  const cups: Cup[] = labels
    .split('')
    .map((l) => {
      return {
        label: parseInt(l),
        next: undefined
      }
    })

  cups.forEach((c, i) => {
    c.next = cups[(i + 1) % cups.length]
  })

  return cups[0]
}

const removeAfter = (cup: Cup, nbrCups: number): Cup => {
  const next = cup.next
  let end = cup
  for (let i=0; i<nbrCups; i++) {
    end = end.next
  }

  cup.next = end.next
  end.next = undefined
  return next
}

const addAfter = (cup: Cup, newCups: Cup) => {
  let end = newCups
  while (end.next) {
    end = newCups.next
  }

  end.next = cup.next
  cup.next = newCups
}

const find = (cup: Cup, matcher: (c: Cup) => boolean): Cup => {
  let found = cup
  while (found.next !== cup) {
    if (matcher(found)) {
      return found
    }

    found = found.next
  }

  return undefined
}

const labels = (cup: Cup): string => {
  let s = cup.label.toString()
  let next = cup.next
  while (next != cup) {
    s += next.label
    next = next.next
  }

  return s
}

const play = (input: string, nbrMoves: number): string => {
  let currentCup = parseCups(input)

  for (let i = 0; i < 10; i++) {
    // Pick up the three next cups
    const removed = removeAfter(currentCup, 3)
    console.log('removed', removed)

    // Find the destination
    let destination: Cup = undefined
    let destinationLabel = currentCup.label
    while (!destination) {
      destinationLabel--
      if (destinationLabel < 1) {
        destinationLabel = 9
      }
      destination = find(currentCup, cup => cup.label === destinationLabel)
    }
    console.log('destination', destination)

    // Add removed cups
    addAfter(destination, removed)

    currentCup = currentCup.next
  }

  const first = find(currentCup, cup => cup.label === 1)
  return labels(first)
}

export default { parseCups, find, removeAfter, addAfter,  play }