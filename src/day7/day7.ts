import fileReader from '../util/fileReader'

export interface Bag {
  color: string
  containedColors: string[]
}

const parseBag = (description: string): Bag => {
  const bagInfo = description.split(' bags contain ')
  const containedColors = bagInfo[1].split(',').map((containedBag) =>
    containedBag
      .trim()
      .split(' ')
      .filter((word) => isNaN(parseInt(word)) && !word.startsWith('bag'))
      .join(' ')
  )

  const color = bagInfo[0]

  return { color, containedColors }
}

const canHold = (color: string, bag: Bag, bags: Bag[]): boolean => {
  if (bag.containedColors.includes(color)) {
    return true
  } else {
    return (
      bag.containedColors
        .filter((c) => c !== 'no other')
        .map((c) => bags.find((b) => b.color === c))
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

export default { parseBag, nbrBags }
