import fileReader from '../util/fileReader'

const binaryPartition = (nbr: number, input: Array<string>): Array<number> => {
  let a = new Array<number>()
  for (let i = 0; i <= nbr; i++) {
    a.push(i)
  }
  input.forEach((i) => {
    if (i === 'F' || i === 'L') {
      a = a.slice(0, a.length / 2)
    } else {
      a = a.slice(a.length / 2, a.length)
    }
  })

  return a
}

const calculateSeatId = (input: string): number => {
  const rowInput = input.substring(0, 7)
  const columnInput = input.substring(7)

  const row = binaryPartition(127, rowInput.split(''))[0]
  const column = binaryPartition(7, columnInput.split(''))[0]

  return row * 8 + column
}

const calculateHighestSeatId = (path: string): number => {
  return fileReader
    .readStringArray(path)
    .map((input) => calculateSeatId(input))
    .reduce((acc, curr) => Math.max(acc, curr))
}

export default { binaryPartition, calculateSeatId, calculateHighestSeatId }
