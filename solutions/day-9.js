const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-9.txt', 'utf-8')

const array = rawInput.split('\n').map(line => line.split('').map(str => Number(str)))

function partOne(array) {
  lowPoints = {},
  queue = []

  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      queue.push([y, x])

      while (queue.length) {
        const selfCoords = queue.pop()
        const [ yCoord, xCoord ] = selfCoords
        const self = array[yCoord][xCoord]

        const obj = {}

        if (yCoord - 1 >= 0) obj[`${yCoord - 1},${xCoord}`] = array[yCoord - 1][xCoord]
        if (yCoord + 1 < array.length) obj[`${yCoord + 1},${[xCoord]}`] = array[yCoord + 1][xCoord]
        if (xCoord - 1 >= 0) obj[`${yCoord},${xCoord - 1}`] = array[yCoord][xCoord - 1]
        if (xCoord + 1 < array[yCoord].length) obj[`${yCoord},${xCoord + 1}`] = array[yCoord][xCoord + 1]

        if (Object.values(obj).every(val => val > self)) {
          lowPoints[`${yCoord},${xCoord}`] = self
        } else {
          const lowest = Math.min(Object.values(obj))
          for (let key in obj) {
            if (obj[key] === lowest) {
              queue.push(key.split(','))
            }
          }
        }
      }
    }
  }

  console.log(lowPoints)

  return Object.values(lowPoints).reduce((acc, val) => {
    acc += (val + 1)
    return acc
  }, 0)
}

console.log(partOne(array))