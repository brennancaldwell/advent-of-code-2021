const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-7.txt', 'utf-8')
const array = rawInput.split(',').map(x => Number(x))

function daySeven(arr, part) {

  const freq = arr.reduce((acc, val) => {
    acc[val]
    ? acc[val]++
    : acc[val] = 1
    return acc
  }, {})

  const vals = Object.keys(freq).map(x => Number(x))

  let fuel = Infinity, value = 0

  for (let i = Math.min(...vals); i < Math.max(...vals); i++) {
    let currentCount = 0
    for (let y = 0; y < vals.length; y++) {
      let cost = Math.abs(i - Number(vals[y]))
      if (part === 'two') cost = ((cost * (cost + 1)) / 2)
      currentCount += (cost * freq[vals[y]])
    }
    if (currentCount < fuel) {
      fuel = currentCount
      value = i
    }
  }
  return fuel

}

console.log(daySeven(array, 'one'))

console.log(daySeven(array, 'two'))
