const connectAdapters = (joltages: number[]) => {
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

export default { connectAdapters }
