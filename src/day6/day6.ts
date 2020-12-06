import * as _ from 'lodash'

const nbrYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.map((line) => line.split('')))
    .flatMap((group) => _.union(...group)).length
}

const nbrAllYes = (groups: Array<Array<string>>): number => {
  return groups
    .map((group) => group.map((answer) => answer.split('')))
    .flatMap((group) => _.intersection(...group)).length
}

export default { nbrYes, nbrAllYes }
