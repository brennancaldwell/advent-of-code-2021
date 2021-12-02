const fs = require('fs')

const inputArray = fs.readFileSync('././inputs/day-one.txt', 'utf-8')

const nums = inputArray.split('\n').map(str => Number(str))

function partOne(array) {
  let counter = 0

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) counter++
  }

  return counter
}

console.log(partOne(nums))

function partTwo(array) {
  let counter = 0,
      prev = array[0] + array[1] + array[2]

  for (let i = 3; i < array.length; i++) {
    const current = prev - array[i - 3] + array[i]
    if (current > prev) counter ++
    prev = current
  }

  return counter
}

console.log(partTwo(nums))