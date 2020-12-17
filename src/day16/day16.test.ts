import day16 from './day16'

test('it finds the ticket scanning error rate', () => {
  const notes = day16.parseNotes(__dirname + '/testInput.txt')
  expect(day16.errorRate(notes)).toBe(71)
})
