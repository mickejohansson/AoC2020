import fileReader from '../util/fileReader'

const nbrValidPassports = (path: string) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  const lines = fileReader.readStringArray(path, '\n\n')
  return lines
    .map((line) => line.replace(/(\r\n|\n|\r)/gm, ' '))
    .map((line) => line.split(' ').map((row) => row.substr(0, 3)))
    .map((password) =>
      requiredFields.every((field) => password.includes(field))
    )
    .reduce(
      (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0),
      0
    )
}

export default { nbrValidPassports }
