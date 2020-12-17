import day16 from './day16'

test('it finds the ticket scanning error rate', () => {
  let notes = day16.parseNotes(__dirname + '/testInput.txt')
  expect(day16.errorRate(notes)).toBe(71)

  notes = day16.parseNotes(__dirname + '/input.txt')
  expect(day16.errorRate(notes)).toBe(25895)
})

test('it finds the sum of the fields starting with departure', () => {
  let notes = day16.parseNotes(__dirname + '/testInput2.txt')
  expect(day16.departureSum(notes)).toBe(1)

  notes = day16.parseNotes(__dirname + '/input.txt')
  expect(day16.departureSum(notes)).toBe(1)
})
