const loopSize = (publicKey: number): number => {
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

const encryptionKey = (publicKey: number, loopSize: number): number => {
  let value = 1
  for(let i=0; i<loopSize; i++) {
    value *= publicKey
    value = value % 20201227
  }

  return value
}

export default { loopSize, encryptionKey }