import day7, { Bag } from './day7'

test('it parses a bag', () => {
  expect(
    day7.parseBag(
      'dull indigo bags contain 3 posh plum bags, 5 shiny coral bags, 5 dull crimson bags.'
    )
  ).toMatchObject({
    color: 'dull indigo',
    containedColors: [
      { count: 3, color: 'posh plum' },
      { count: 5, color: 'shiny coral' },
      { count: 5, color: 'dull crimson' }
    ]
  })

  expect(
    day7.parseBag(
      'clear black bags contain 3 striped plum bags, 3 plaid violet bags, 3 shiny chartreuse bags, 4 bright tomato bags.'
    )
  ).toMatchObject({
    color: 'clear black',
    containedColors: [
      { count: 3, color: 'striped plum' },
      { count: 3, color: 'plaid violet' },
      { count: 3, color: 'shiny chartreuse' },
      { count: 4, color: 'bright tomato' }
    ]
  })
})

test('it finds the number of possible bags', () => {
  expect(day7.nbrBags(__dirname + '/input.txt')).toBe(155)
})

test('it finds the number of contained bags', () => {
  expect(day7.nbrBagsInBag(__dirname + '/testInput.txt')).toBe(126)
  expect(day7.nbrBagsInBag(__dirname + '/input.txt')).toBe(54803)
})
