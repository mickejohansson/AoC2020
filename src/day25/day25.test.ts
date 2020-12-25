import day25 from './day25'

test('it gets the loop size', () => {
  expect(day25.loopSize(5764801)).toBe(8)
  expect(day25.loopSize(17807724)).toBe(11)
})

test('it gets the encryption key', () => {
  expect(day25.encryptionKey(17807724, 8)).toBe(14897079)
  expect(day25.encryptionKey(5764801, 11)).toBe(14897079)

  const loopSize = day25.loopSize(10705932)
  expect(day25.encryptionKey(12301431, loopSize)).toBe(11328376)
})