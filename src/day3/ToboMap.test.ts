import { ToboMap, MapMarker } from './ToboMap'

test('it returns the correct markers', () => {
  const toboMap = new ToboMap(__dirname + '/testInput.txt')
  expect(toboMap.getMarkerAt(3, 7)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(0, 0)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(10, 10)).toBe(MapMarker.TREE)
  expect(toboMap.getMarkerAt(1, 10)).toBe(MapMarker.TREE)
  expect(toboMap.getMarkerAt(0, 11)).toBe(MapMarker.FINISH)
  expect(toboMap.getMarkerAt(0, 12)).toBe(MapMarker.FINISH)
  expect(toboMap.getMarkerAt(0, 13)).toBe(MapMarker.EMPTY)
  expect(toboMap.getMarkerAt(11, 9)).toBe(MapMarker.TREE)
})

test('it returns the number of hit trees in the small map', () => {
  const toboMap = new ToboMap(__dirname + '/testInput.txt')
  expect(toboMap.getNumberHitTrees(1, 1)).toBe(2)
  expect(toboMap.getNumberHitTrees(3, 1)).toBe(7)
  expect(toboMap.getNumberHitTrees(5, 1)).toBe(3)
  expect(toboMap.getNumberHitTrees(7, 1)).toBe(4)
  expect(toboMap.getNumberHitTrees(1, 2)).toBe(2)
})

test('it returns the number of hit trees for the big map', () => {
  const toboMap = new ToboMap(__dirname + '/input.txt')
  expect(toboMap.getNumberHitTrees(1, 1)).toBe(63)
  expect(toboMap.getNumberHitTrees(3, 1)).toBe(181)
  expect(toboMap.getNumberHitTrees(5, 1)).toBe(55)
  expect(toboMap.getNumberHitTrees(7, 1)).toBe(67)
  expect(toboMap.getNumberHitTrees(1, 2)).toBe(30)
})
