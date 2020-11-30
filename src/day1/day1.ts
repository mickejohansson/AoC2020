const calculate = (weights: Array<number>) => {
  return weights.reduce((accumulator, currentValue) => {
    return accumulator + Math.floor(currentValue / 3) - 2
  }, 0)
}

export default calculate
