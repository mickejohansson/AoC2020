import fileReader from '../util/fileReader'

export enum MapMarker {
  EMPTY,
  TREE,
  FINISH
}

export class ToboMap {
  mapData: Array<Array<MapMarker>> = []

  constructor(path: string) {
    const lines = fileReader.readStringArray(path)
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
      const finishLine: Array<MapMarker> = new Array<MapMarker>(row.length)
      finishLine.fill(MapMarker.FINISH)
    })
  }

  getMarkerAt(x: number, y: number): MapMarker {
    return this.mapData[y][x]
  }
}
