import fileReader from '../util/fileReader'

const isFieldValid = (field: Array<string>): boolean => {
  if (field[0] === 'byr') {
    const year = parseInt(field[1])
    return field[1].length === 4 && year >= 1920 && year <= 2002
  } else if (field[0] === 'iyr') {
    const year = parseInt(field[1])
    return field[1].length === 4 && year >= 2010 && year <= 2020
  } else if (field[0] === 'eyr') {
    const year = parseInt(field[1])
    return field[1].length === 4 && year >= 2020 && year <= 2030
  } else if (field[0] === 'hgt') {
    const unit = field[1].slice(field[1].length - 2)
    const value = parseInt(field[1].slice(0, field[1].length - 2))
    return (
      (unit === 'cm' && value >= 150 && value <= 193) ||
      (unit === 'in' && value >= 59 && value <= 76)
    )
  } else if (field[0] === 'hcl') {
    return /^#[0-9a-f]{6}$/g.test(field[1])
  } else if (field[0] === 'ecl') {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(field[1])
  } else if (field[0] === 'pid') {
    return /^\d{9}$/g.test(field[1])
  } else if (field[0] === 'cid') {
    return true
  }
  return false
}

const nbrValidPassports = (path: string, validateFields: boolean = false) => {
  const requiredFieldIds = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  const lines = fileReader.readStringArray(path, '\n\n')
  return lines
    .map((line) => line.replace(/(\r\n|\n|\r)/gm, ' '))
    .map((line) => line.split(' ').map((fieldString) => fieldString.split(':')))
    .map((passport) =>
      passport.map((field) =>
        validateFields && !isFieldValid(field) ? [undefined, undefined] : field
      )
    )
    .map((passport) => passport.map((field) => field[0]))
    .map((fieldIds) =>
      requiredFieldIds.every((fieldId) => fieldIds.includes(fieldId))
    )
    .reduce(
      (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0),
      0
    )
}

export default { nbrValidPassports, isFieldValid }
