const findProduct = (entries: Array<number>) => {
  let result: number = undefined
  entries.forEach((entry) => {
    if (entries.includes(2020 - entry)) {
      result = (2020 - entry) * entry
    }
  })

  return result
}

export default findProduct
