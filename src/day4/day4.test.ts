import day4 from './day4'
test('it returns the number of valid inputs', () => {
  expect(day4.nbrValidPassports(__dirname + '/testInput.txt')).toBe(2)
  expect(day4.nbrValidPassports(__dirname + '/input.txt')).toBe(222)
})

test('it senses valid fields', () => {
  expect(day4.isFieldValid(['byr', '2002'])).toBe(true)
  expect(day4.isFieldValid(['byr', '2003'])).toBe(false)
  expect(day4.isFieldValid(['byr', '202'])).toBe(false)
  expect(day4.isFieldValid(['byr', '2022'])).toBe(false)
  expect(day4.isFieldValid(['byr', '1900'])).toBe(false)

  expect(day4.isFieldValid(['iyr', '1900'])).toBe(false)
  expect(day4.isFieldValid(['iyr', '2011'])).toBe(true)
  expect(day4.isFieldValid(['iyr', '205'])).toBe(false)

  expect(day4.isFieldValid(['eyr', '2020'])).toBe(true)
  expect(day4.isFieldValid(['eyr', '2011'])).toBe(false)

  expect(day4.isFieldValid(['hgt', '60in'])).toBe(true)
  expect(day4.isFieldValid(['hgt', '190cm'])).toBe(true)
  expect(day4.isFieldValid(['hgt', '190in'])).toBe(false)
  expect(day4.isFieldValid(['hgt', '190'])).toBe(false)

  expect(day4.isFieldValid(['hcl', '#123abc'])).toBe(true)
  expect(day4.isFieldValid(['hcl', '123abc'])).toBe(false)
  expect(day4.isFieldValid(['hcl', '#123abz'])).toBe(false)

  expect(day4.isFieldValid(['ecl', 'brn'])).toBe(true)
  expect(day4.isFieldValid(['ecl', 'wat'])).toBe(false)

  expect(day4.isFieldValid(['pid', '000043212'])).toBe(true)
  expect(day4.isFieldValid(['pid', '43212'])).toBe(false)
  expect(day4.isFieldValid(['pid', '43212343434343'])).toBe(false)
})

test('it finds all the invalid passports', () => {
  expect(
    day4.nbrValidPassports(__dirname + '/invalidPassports.txt', true)
  ).toBe(0)
})

test('it finds all the valid passports', () => {
  expect(day4.nbrValidPassports(__dirname + '/validPassports.txt', true)).toBe(
    4
  )
})

test('it finds the number of valid passports', () => {
  expect(day4.nbrValidPassports(__dirname + '/input.txt', true)).toBe(140)
})
