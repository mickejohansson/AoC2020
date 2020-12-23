import fileReader from '../util/fileReader'
import * as _ from 'lodash'

const solve = (path: string): number => {
  const possibleBadIngredients: Map<string, string[]> = new Map()
  fileReader
    .readStringArray(path)
    .map((line) => line.match(/^([\S ]+) \(contains ([\S ]+)\)$/))
    .map((match) => {
      return {
        ingredients: match[1].split(' '),
        allergens: match[2].split(', ')
      }
    })
    .forEach((r) => {
      r.allergens.forEach((allergen) => {
        if (possibleBadIngredients.has(allergen)) {
          possibleBadIngredients.set(
            allergen,
            _.intersection(possibleBadIngredients.get(allergen), r.ingredients)
          )
        } else {
          possibleBadIngredients.set(allergen, r.ingredients)
        }
      })
    })

  const badIngredients: Map<string, string> = new Map()
  let a = Array.from(possibleBadIngredients)
  let i = 0
  console.log('a', a)
  console.log('bad', badIngredients)
  while (a.length > 0) {
    a.filter((entry) => entry[1].length === 1).forEach((entry) => {
      badIngredients.set(entry[1][0], entry[0])
    })
    a = a.filter((entry) => entry[1].length > 1)

    a.forEach((entry) => {
      entry[1] = entry[1].filter(
        (ingredient) => !badIngredients.has(ingredient)
      )
    })

    console.log('a', a)
    console.log('bad', badIngredients)
    i++
  }

  return undefined
}

export default { solve }
