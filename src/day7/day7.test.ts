import day7, { Bag } from './day7'

test('it parses a bag', () => {
  expect(
    day7.parseBag(
      'dull indigo bags contain 3 posh plum bags, 5 shiny coral bags, 5 dull crimson bags.'
    )
  ).toMatchObject({
    color: 'dull indigo',
    containedColors: ['posh plum', 'shiny coral', 'dull crimson']
  })

  expect(
    day7.parseBag(
      'clear black bags contain 3 striped plum bags, 3 plaid violet bags, 3 shiny chartreuse bags, 4 bright tomato bags.'
    )
  ).toMatchObject({
    color: 'clear black',
    containedColors: [
      'striped plum',
      'plaid violet',
      'shiny chartreuse',
      'bright tomato'
    ]
  })

  expect(
    day7.parseBag('drab green bags contain 4 posh gold bags.')
  ).toMatchObject({
    color: 'drab green',
    containedColors: ['posh gold']
  })
})

test('it finds the number of possible bags', () => {
  expect(day7.nbrBags(__dirname + '/input.txt')).toBe(155)
})
