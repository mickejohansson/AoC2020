const isSumOf = (nbr: number, nbrs: number[]): boolean => {
  for (let i = 0; i < nbrs.length; i++) {
    for (let j = 0; j < nbrs.length; j++) {
      if (j !== i && nbrs[i] + nbrs[j] === nbr) {
        return true
      }
    }
  }

  return false
}

const firstIncorrectNbr = (nbrs: number[], preambleSize: number): number => {
  for (let i = preambleSize; i < nbrs.length; i++) {
    if (!isSumOf(nbrs[i], nbrs.slice(i - preambleSize, i))) {
      return nbrs[i]
    }
  }

  return undefined
}

export default { isSumOf, firstIncorrectNbr }
