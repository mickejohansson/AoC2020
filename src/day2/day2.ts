const entry = (line: string) => {
  const lineParts = line.split(' ')
  const range = lineParts[0].split('-').map((l) => parseInt(l))
  return {
    range,
    letter: lineParts[1].replace(':', ''),
    password: lineParts[2]
  }
}

const nbrValidPasswords = (lines: Array<string>) => {
  return lines.map((line) => entry(line))
}

export default { nbrValidPasswords }
