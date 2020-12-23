import fileReader from '../util/fileReader'
import * as _ from 'lodash'

interface Food {
  ingredients: string[]
  allergens: string[]
}

const parseInput = (path: string): Food[] => {
  return fileReader
    .readStringArray(path)
    .map((line) => line.match(/^([\S ]+) \(contains ([\S ]+)\)$/))
    .map((match) => {
      return {
        ingredients: match[1].split(' '),
        allergens: match[2].split(', ')
      }
    })
}

const getBadIngredients = (foods: Food[]): Map<string, string> => {
  const possibleBadIngredients: Map<string, string[]> = new Map()

  foods.forEach((r) => {
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

    i++
  }
  return badIngredients
}

const safeIngredients = (path: string): string[] => {
  const input = parseInput(path)
  const badIngredients = getBadIngredients(input)

  const safeIngredients = input
    .reduce((acc, curr) => acc.concat(curr.ingredients), [])
    .filter((ingredient) => !badIngredients.has(ingredient))
  return safeIngredients
}

const dangerousIngredients = (path: string): string => {
  const input = parseInput(path)
  const badIngredients = getBadIngredients(input)

  const array = Array.from(badIngredients.entries())
  return array
    .sort((e1, e2) => e1[1].localeCompare(e2[1]))
    .map((e) => e[0])
    .join(',')
}

export default { safeIngredients, dangerousIngredients }
