const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-6.txt', 'utf-8')
const fish = rawInput.split(',').map(x => Number(x))


function partOne(array, repetitions) {
  let fish = array, newBorns = 0, days = 0

  while (days < repetitions) {
    for (let i = 0; i < fish.length; i++) {
      if (array[i] === 0) {
        array[i] = 6
        newBorns++
      } else {
        array[i]--
      }
    }
    while (newBorns > 0) {
      fish.push(8)
      newBorns--
    }
    days++
  }

  return fish.length
}

console.log(partOne(fish, 80))