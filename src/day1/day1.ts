const find2Product = (entries: Array<number>) => {
  let result: number = undefined
  entries.forEach((entry) => {
    if (entries.includes(2020 - entry)) {
      result = (2020 - entry) * entry
    }
  })

  return result
}

const find3Product = (entries: Array<number>) => {
  for (const i of entries) {
    for (const j of entries) {
      const partSum = i + j
      if (partSum < 2020) {
        if (entries.includes(2020 - partSum)) {
          return (2020 - partSum) * i * j
        }
      }
    }
  }

  return undefined
}

export default { find2Product, find3Product }
