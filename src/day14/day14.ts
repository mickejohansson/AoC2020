const masked = (mask: string, nbr: number): number => {
  const nbrArray = nbr.toString(2).split('').reverse()
  const maskedNbr = mask
    .split('')
    .reverse()
    .map((c, i) => (c === 'X' ? (i < nbrArray.length ? nbrArray[i] : '0') : c))
    .reverse()
    .reduce((acc, curr) => acc + curr, '')

  return parseInt(maskedNbr, 2)
}

const maskedAddresses = (mask: string, address: number): number[] => {
  const addressArray = address.toString(2).split('').reverse()
  const maskedAddress = mask
    .split('')
    .reverse()
    .map((c, i) => {
      switch (c) {
        case 'X':
          return 'X'
        case '0':
          i < addressArray.length ? addressArray[i] : 0
        case '1':
          return 1
      }
    })
    .reverse()
    .reduce((acc, curr) => acc + curr, '')

  console.log('maskedAddress', maskedAddress)

  return undefined
}

const runProgram = (lines: string[]): number => {
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const memory: Map<number, number> = new Map()
  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.slice(-36)
    } else if (line.startsWith('mem')) {
      const matches = line.match(/mem\[(\d+)\] = (\d+)/)
      const memAddress = parseInt(matches[1])
      const val = parseInt(matches[2])

      memory.set(memAddress, masked(mask, val))
    }
  })

  let result = 0
  memory.forEach((val) => (result += val))

  return result
}

export default { masked, runProgram, maskedAddresses }
