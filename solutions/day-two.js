const fs = require('fs')

const rawInputs = fs.readFileSync('././inputs/day-two.txt', 'utf-8')

const inputArray = rawInputs.split('\n').map(line => {
  const duple = line.split(' ')
  duple[1] = Number(duple[1])
  return duple
})

function partOne(arr) {
  let horiz = 0, depth = 0;

  arr.forEach(duple => {
    if (duple[0] === 'forward') horiz += duple[1]
    else if (duple[0] === 'down') depth += duple[1]
    else depth -= duple[1]
  })

  return horiz * depth;
}

console.log(partOne(inputArray))

function partTwo(arr) {
  let horiz = 0, depth = 0, aim = 0;

  arr.forEach(duple => {
    if (duple[0] === 'forward') {
      horiz += duple[1]
      depth += (aim * duple[1])
    } else if (duple[0] === 'down') {
      aim += duple[1]
    } else if (duple[0] === 'up'){
      aim -= duple[1]
    }
  })

  return horiz * depth;
}

console.log(partTwo(inputArray))