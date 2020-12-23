import fileReader from '../util/fileReader'
import * as _ from 'lodash'

const solve = (path: string): number => {
  const possibleBadIngredients: Map<string, string[]> = new Map()
  const a = fileReader
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

  console.log('possible', possibleBadIngredients)
  return undefined
}

export default { solve }
