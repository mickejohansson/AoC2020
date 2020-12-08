import fileReader from '../util/fileReader'

const run = (path: string): number => {
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

    if (visitedLines.includes(nextLineNbr) || nextLineNbr >= lines.length) {
      return acc
    }

    visitedLines.push(nextLineNbr)
  }

  return acc
}

export default { run }
