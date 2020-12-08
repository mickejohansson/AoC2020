import fileReader from '../util/fileReader'

interface Result {
  success: boolean
  acc: number
}

interface Line {
  op: string
  arg: number
}

const parse = (path: string): Line[] => {
  return fileReader.readStringArray(path).map((line) => {
    const lineParts = line.split(' ')
    return { op: lineParts[0], arg: parseInt(lineParts[1]) }
  })
}

const run = (lines: Line[]): Result => {
  let acc = 0
  let nextLineNbr = 0
  const visitedLines: Array<number> = []
  while (nextLineNbr != null) {
    const line = lines[nextLineNbr]

    switch (line.op) {
      case 'acc':
        acc += line.arg
        nextLineNbr++
        break
      case 'jmp':
        nextLineNbr += line.arg
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

const findFixedProgram = (path: string): number => {
  const lines = fileReader.readStringArray(path)
  return 0
}

export default { parse, run }
