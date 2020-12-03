import fileReader from '../util/fileReader'

export enum MapMarker {
  EMPTY,
  TREE,
  FINISH
}

export class ToboMap {
  mapData: Array<Array<MapMarker>> = []
  width: number
  height: number

  constructor(path: string) {
    const lines = fileReader.readStringArray(path)
    this.width = lines[0].length
    this.height = lines.length + 2

    lines.forEach((line) => {
      const row: Array<MapMarker> = []
      line.split('').forEach((c) => {
        if (c === '.') {
          row.push(MapMarker.EMPTY)
        } else {
          row.push(MapMarker.TREE)
        }
      })
      this.mapData.push(row)
    })
    const finishLine: Array<MapMarker> = new Array<MapMarker>(this.width)
    finishLine.fill(MapMarker.FINISH)
    this.mapData.push(finishLine)
    this.mapData.push(finishLine)
  }

  getMarkerAt(x: number, y: number): MapMarker {
    const wrappingX = x % this.width
    const wrappingY = y % this.height
    return this.mapData[wrappingY][wrappingX]
  }

  getNumberHitTrees(stepRight: number, stepDown: number): number {
    let currentMarker: MapMarker = undefined
    let currentX = 0
    let currentY = 0
    let nbrHitTrees = 0
    while (currentMarker !== MapMarker.FINISH) {
      currentMarker = this.getMarkerAt(currentX, currentY)
      if (currentMarker === MapMarker.TREE) {
        nbrHitTrees++
      }
      currentX += stepRight
      currentY += stepDown
    }

    return nbrHitTrees
  }
}
