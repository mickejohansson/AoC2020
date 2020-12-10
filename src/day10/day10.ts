const connectAdapters = (joltages: number[]): number[] => {
  return joltages
    .sort((a, b) => a - b)
    .reduce(
      (acc, curr, index) => {
        const prev = index === 0 ? 0 : joltages[index - 1]
        acc[curr - prev]++
        return acc
      },
      [0, 0, 0, 1]
    )
}

const combinationsFor = (
  joltage: number,
  joltages: number[],
  last: number,
  cache: Map<number, number>
): number => {
  if (joltage === last) {
    return 1
  }

  const cached = cache.get(joltage)
  if (cached !== undefined) {
    return cached
  }

  const c = joltages
    .filter((j) => j > joltage && j <= joltage + 3)
    .map((j) => combinationsFor(j, joltages, last, cache))
    .reduce((acc, curr) => acc + curr, 0)

  cache.set(joltage, c)
  return c
}

const getNbrCombinations = (joltages: number[]): number => {
  joltages.push(0)
  joltages = joltages.sort((a, b) => a - b)
  const cache = new Map()
  joltages.forEach((j) =>
    combinationsFor(j, joltages, joltages[joltages.length - 1], cache)
  )
  return cache.get(0)
}

export default { connectAdapters, getNbrCombinations }
