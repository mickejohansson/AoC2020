import fileReader from '../util/fileReader'

interface Result {
  success: boolean
  acc: number
}

const run = (path: string): Result => {
  const lines = fileReader.readStringArray(path)

  let acc = 0
  let nextLineNbr = 0
  const visitedLines: Array<number> = []
  while (nextLineNbr != null) {
    const line = lines[nextLineNbr].split(' ')
    const op = line[0]
    const arg = line[1]

    switch (op) {
      case 'acc':
        acc += parseInt(arg)
        nextLineNbr++
        break
      case 'jmp':
        nextLineNbr += parseInt(arg)
        break
      default:
        nextLineNbr++
    }

    if (visitedLines.includes(nextLineNbr)) {
      return { success: false, acc }
    }

    if (nextLineNbr >= lines.length) {
      return { success: true, acc }
    }

    visitedLines.push(nextLineNbr)
  }

  return { success: false, acc }
}

export default { run }
