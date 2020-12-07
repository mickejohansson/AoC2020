import fileReader from '../util/fileReader'

export interface Bag {
  color: string
  containedColors: { count: number; color: string }[]
}

const parseBag = (description: string): Bag => {
  const bagInfo = description.split(' bags contain ')
  const containedColors = bagInfo[1]
    .split(',')
    .filter((c) => !c.startsWith('no other bag'))
    .map((containedBagDescription) => {
      const words = containedBagDescription.trim().split(' ')
      return {
        count: parseInt(words[0]),
        color: words[1] + ' ' + words[2]
      }
    })

  const color = bagInfo[0]

  return { color, containedColors }
}

const canHold = (color: string, bag: Bag, bags: Bag[]): boolean => {
  if (
    bag.containedColors.find((containedColor) => containedColor.color === color)
  ) {
    return true
  } else {
    return (
      bag.containedColors
        .filter((c) => c.color !== 'no other')
        .map((c) => bags.find((b) => b.color === c.color))
        .map((b) => canHold(color, b, bags))
        .filter((canHold) => canHold === true).length > 0
    )
  }
}

const nbrBags = (path: string): number => {
  const bags = fileReader.readStringArray(path).map((line) => parseBag(line))

  return bags.filter((bag, index, bags) => canHold('shiny gold', bag, bags))
    .length
}

const nbrContainedBags = (
  containdedColors: { count: number; color: string }[],
  bags: Bag[]
): number => {
  let childSum = 0
  if (containdedColors.length > 0) {
    childSum = containdedColors.reduce((acc, curr) => {
      const currBag = bags.find((b) => b.color === curr.color)
      return (
        acc + curr.count * (nbrContainedBags(currBag.containedColors, bags) + 1)
      )
    }, 0)
  }

  return childSum
}

const nbrBagsInBag = (path: string): number => {
  const bags = fileReader.readStringArray(path).map((line) => parseBag(line))
  const shinyGoldBag = bags.find((b) => b.color === 'shiny gold')
  const nbrContained = nbrContainedBags(shinyGoldBag.containedColors, bags)

  return nbrContained
}

export default { parseBag, nbrBags, nbrBagsInBag }
