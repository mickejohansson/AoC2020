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

const nbrBags = (path: string): number => {
  const bags = fileReader.readStringArray(path).map((line) => parseBag(line))
  return undefined
}

export default { parseBag }
