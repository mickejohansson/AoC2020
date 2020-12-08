import day8 from './day8'

test('it runs code', () => {
  let lines = day8.parse(__dirname + '/testInput.txt')
  expect(day8.run(lines)).toMatchObject({
    success: false,
    acc: 5
  })
  lines = day8.parse(__dirname + '/input.txt')
  expect(day8.run(lines)).toMatchObject({
    success: false,
    acc: 1949
  })
})

test('it figures out the fixed program', () => {
  expect(day8.findFixedProgram(__dirname + '/testInput.txt')).toBe(8)
  expect(day8.findFixedProgram(__dirname + '/input.txt')).toBe(2092)
})
