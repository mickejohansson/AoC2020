const union = (arrs: Array<Array<string>>): Array<string> => {
  const s = new Set<string>()
  arrs.flat().forEach((value) => s.add(value))
  return Array.from(s)
}

const intersection = (arrs: Array<Array<string>>): Array<string> => {
  return arrs.map((arr) =>
    arr.filter((value) => arrs.every((a) => a.includes(value)))
  )[0]
}

const nbrYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.map((line) => line.split('')))
    .flatMap((group) => union(group)).length
}

const nbrAllYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.map((answer) => answer.split('')))
    .flatMap((group) => intersection(group)).length
}

export default { union, intersection, nbrYes, nbrAllYes }
