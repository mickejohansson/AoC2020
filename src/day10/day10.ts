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

let cache: Map<number, number> = new Map()
const combinationsFor = (
  joltage: number,
  joltages: number[],
  last: number
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
    .map((j) => combinationsFor(j, joltages, last))
    .reduce((acc, curr) => acc + curr, 0)

  cache.set(joltage, c)
  return c
}

const getNbrCombinations = (joltages: number[]): number => {
  joltages.push(0)
  joltages = joltages.sort((a, b) => a - b)
  cache = new Map()
  joltages.forEach((j) =>
    combinationsFor(j, joltages, joltages[joltages.length - 1])
  )
  return cache.get(0)
}

export default { connectAdapters, getNbrCombinations }
