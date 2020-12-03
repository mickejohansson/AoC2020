import { ToboMap, MapMarker } from './ToboMap'

test('it returns the correct markers', () => {
  const toboMap = new ToboMap(__dirname + '/testInput.txt')
  expect(toboMap.getMarkerAt(3, 7)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(0, 0)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(10, 10)).toBe(MapMarker.TREE)
  expect(toboMap.getMarkerAt(1, 10)).toBe(MapMarker.TREE)
  expect(toboMap.getMarkerAt(0, 11)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(11, 9)).toBe(MapMarker.TREE)
})
