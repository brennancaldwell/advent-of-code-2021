const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-6.txt', 'utf-8')
const fish = rawInput.split(',').map(x => Number(x))


function partOne(array, repetitions) {
  let fish = array.slice(), newBorns = 0, days = 0

  while (days < repetitions) {
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        fish[i] = 6
        newBorns++
      } else {
        fish[i]--
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

function partTwo(array, repetitions) {
  const fish = {
    0: array.filter(val => val === 0).length,
    1: array.filter(val => val === 1).length,
    2: array.filter(val => val === 2).length,
    3: array.filter(val => val === 3).length,
    4: array.filter(val => val === 4).length,
    5: array.filter(val => val === 5).length,
    6: array.filter(val => val === 6).length,
    7: array.filter(val => val === 7).length,
    8: array.filter(val => val === 8).length
  }

  for (let i = 0; i < repetitions; i++) {
    const zeroes = fish[0]
    fish[0] = fish[1]
    fish[1] = fish[2]
    fish[2] = fish[3]
    fish[3] = fish[4]
    fish[4] = fish[5]
    fish[5] = fish[6]
    fish[6] = fish[7] + zeroes
    fish[7] = fish[8]
    fish[8] = zeroes
  }

  return Object.values(fish).reduce((a, b) => a + b)
}

console.log(partTwo(fish, 256))