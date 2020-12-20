import fileReader from '../util/fileReader'

interface Tile {
  id: number
  data: string[][]
}

const cornerProduct = (path: string): number => {
  const tiles: Tile[] = fileReader
    .readStringArray(path, '\n\n')
    .map((chunk) => chunk.split('\n'))
    .map((tileInfo) => {
      return {
        id: parseInt(tileInfo[0].match(/Tile (\d+):/)[1]),
        data: tileInfo.slice(1).map((row) => row.split(''))
      }
    })

  console.log('tiles', tiles)

  return undefined
}

export default { cornerProduct }
