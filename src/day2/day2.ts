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
  const entries = lines.map((line) => entry(line))

  let nbrCorrect = 0
  entries.forEach((entry) => {
    const nbrOccurencies = entry.password
      .split('')
      .filter((c) => c === entry.letter).length
    if (nbrOccurencies >= entry.range[0] && nbrOccurencies <= entry.range[1]) {
      nbrCorrect += 1
    }
  })

  return nbrCorrect
}

const nbrValidTobogganPasswords = (lines: Array<string>) => {
  const entries = lines.map((line) => entry(line))

  let nbrCorrect = 0
  entries.forEach((entry) => {
    const firstChar = entry.password.charAt(entry.range[0] - 1)
    const secondChar = entry.password.charAt(entry.range[1] - 1)
    if (
      (firstChar === entry.letter || secondChar === entry.letter) &&
      firstChar !== secondChar
    ) {
      nbrCorrect += 1
    }
  })

  return nbrCorrect
}

export default { nbrValidPasswords, nbrValidTobogganPasswords }
