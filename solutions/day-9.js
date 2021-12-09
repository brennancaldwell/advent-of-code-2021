const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-9.txt', 'utf-8')

const array = rawInput.split('\n').map(line => line.split('').map(str => Number(str)))

function lowPoint(array, y, x) {
  const self = array[y][x]

  const obj = {}
  if (y - 1 >= 0) obj[`${y - 1},${x}`] = array[y - 1][x]
  if (y + 1 < array.length) obj[`${y + 1},${[x]}`] = array[y + 1][x]
  if (x - 1 >= 0) obj[`${y},${x - 1}`] = array[y][x - 1]
  if (x + 1 < array[y].length) obj[`${y},${x + 1}`] = array[y][x + 1]

  if (Object.values(obj).every(val => val > self)) {
    return `${y},${x}`
  } else {
    const lowest = Math.min(...Object.values(obj))
    for (let key in obj) {
      if (obj[key] === lowest) {
        const [newY, newX] = key.split(',')
        return lowPoint(array, Number(newY), Number(newX))
      }
    }
  }
}


function partOne(array) {
  let lowPoints = {}

  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      const coords = lowPoint(array, y, x)
      const [ yCoord, xCoord ] = coords.split(',')
      lowPoints[coords] = array[yCoord][xCoord]
    }
  }

  return Object.values(lowPoints).reduce((acc, val) => {
    acc += (val + 1)
    return acc
  }, 0)
}

console.log(partOne(array))


function lowPoint(array, y, x) {
  const self = array[y][x]

  const obj = {}
  if (y - 1 >= 0) obj[`${y - 1},${x}`] = array[y - 1][x]
  if (y + 1 < array.length) obj[`${y + 1},${[x]}`] = array[y + 1][x]
  if (x - 1 >= 0) obj[`${y},${x - 1}`] = array[y][x - 1]
  if (x + 1 < array[y].length) obj[`${y},${x + 1}`] = array[y][x + 1]

  if (Object.values(obj).every(val => val > self)) {
    return `${y},${x}`
  } else {
    const lowest = Math.min(...Object.values(obj))
    for (let key in obj) {
      if (obj[key] === lowest) {
        const [newY, newX] = key.split(',')
        return lowPoint(array, Number(newY), Number(newX))
      }
    }
  }
}

function partTwo(array) {
  let lowPoints = {}

  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (array[y][x] === 9) continue

      const lowPt = lowPoint(array, y, x)
      lowPoints[lowPt]
      ? lowPoints[lowPt]++
      : lowPoints[lowPt] = 1
    }
  }

  return Object.values(lowPoints).sort((a, b) => b - a).slice(0, 3).reduce((acc, val) => {
    acc *= val
    return acc
  }, 1)
}

console.log(partTwo(array))