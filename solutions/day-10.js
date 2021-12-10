const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-10.txt', 'utf-8')
const array = rawInput.split('\n')

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

function partOne(array, points) {
  let result = 0, tracker = []

  const end = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
  }

  for (let i = 0; i < array.length; i++) {
    for (let x = 0; x < array[i].length; x++) {
      let found = false
      if (Object.keys(end).includes(array[i][x])) {
        tracker.push(end[array[i][x]])
      } else {
        if (tracker.length === 0) {
          result += points[array[i][x]]
          found = true
        } else {
          if (tracker[tracker.length - 1] === array[i][x]) {
            tracker.pop()
          } else {
            result += points[array[i][x]]
            found = true
          }
        }
      }
      if (found) break
    }
  }

  return result
}

console.log(partOne(array, points))