const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-5.txt', 'utf-8')
const array = rawInput.split('\n').map(line => line.split(' -> ').map(pair => {
  const duple = pair.split(',')
  return { x: Number(duple[0]), y: Number(duple[1])}
}))

const partOneInput = array.filter(cp => {
  return (cp[0].x === cp[1].x) || (cp[0].y === cp[1].y)
})

function partOne(arr) {
  const intersectionTracker = {}

  partOneInput.forEach(pair => {
    const axis = pair[0].x === pair[1].x ? 'y' : 'x'
    let min = Math.min(pair[0][axis], pair[1][axis])
    const max = Math.max(pair[0][axis], pair[1][axis])
    while (min <= max) {
      if (axis === 'x') {
        intersectionTracker[`${min},${pair[0].y}`]
        ? intersectionTracker[`${min},${pair[0].y}`]++
        : intersectionTracker[`${min},${pair[0].y}`] = 1
      } else {
        intersectionTracker[`${pair[0].x},${min}`]
        ? intersectionTracker[`${pair[0].x},${min}`]++
        : intersectionTracker[`${pair[0].x},${min}`] = 1
      }
      min++
    }
  })

  return Object.values(intersectionTracker).filter(val => val >= 2).length
}

console.log(partOne(partOneInput))