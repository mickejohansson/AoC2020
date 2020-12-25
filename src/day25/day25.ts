const determineLoopSize = (publicKey: number): number => {
  let loopSize = 0
  let value = 1
  while (true) {
    loopSize++

    value *= 7
    value = value % 20201227

    if (value === publicKey) {
      return loopSize
    }
  }
}

export default { determineLoopSize }