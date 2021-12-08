const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-8.txt', 'utf-8')
const array = rawInput.split('\n').map(line => line.split(' | ').map(piece => piece.split(' ')))

function isUnique(len) {
  return len === 2 || len === 4 || len === 3 || len === 7
}

const partOne = array.reduce((acc, duple) => {
  acc += duple[1].filter(output => isUnique(output.length)).length
  return acc
}, 0)

console.log(partOne)