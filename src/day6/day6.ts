const nbrYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.flatMap((line) => line.split('')))
    .map((group) => {
      const m = new Map()
      group.forEach((answer) => m.set(answer, true))
      return m
    })
    .reduce((acc, curr) => acc + curr.size, 0)
}

export default { nbrYes }
