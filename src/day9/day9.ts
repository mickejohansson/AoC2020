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

const findContinousSet = (nbr: number, nbrs: number[]): number[] => {
  for (let startIndex = 0; startIndex < nbrs.length; startIndex++) {
    let sum = 0
    let endIndex = startIndex
    while (sum < nbr && endIndex < nbrs.length) {
      sum += nbrs[endIndex]
      endIndex++
    }

    if (sum === nbr) {
      return nbrs.slice(startIndex, endIndex)
    }
  }

  return undefined
}

const findEncryptionWeakness = (
  nbrs: number[],
  preambleSize: number
): number => {
  const incorrectNumber = firstIncorrectNbr(nbrs, preambleSize)

  const sortedSet = findContinousSet(incorrectNumber, nbrs).sort(
    (a, b) => a - b
  )
  return sortedSet[0] + sortedSet[sortedSet.length - 1]
}

export default {
  isSumOf,
  firstIncorrectNbr,
  findContinousSet,
  findEncryptionWeakness
}
