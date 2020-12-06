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

const intersection = (arrs: Array<Array<string>>): Array<string> => {
  return arrs.map((arr) =>
    arr.filter((value) => arrs.every((a) => a.includes(value)))
  )[0]
}

const nbrAllYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.map((answer) => answer.split('')))
    .flatMap((group) => intersection(group)).length
}

export default { nbrYes, nbrAllYes, intersection }
