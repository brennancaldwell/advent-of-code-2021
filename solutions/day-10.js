const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-10.txt', 'utf-8')
const array = rawInput.split('\n')

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const end = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

function partOne(array, points, end) {
  let result = 0, tracker = []

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

console.log(partOne(array, points, end))


function corrupted(str, end) {

  let tracker = [], result = false

  for (let i = 0; i < str.length; i++) {
    if (Object.keys(end).includes(str[i])) {
      tracker.push(end[str[i]])
    } else {
      if (tracker.length === 0) {
        result = true
      } else {
        if (tracker[tracker.length - 1] === str[i]) {
          tracker.pop()
        } else {
          result = true
        }
      }
    }
    if (result) break
  }

  return result
}

const inputTwo = array.filter(line => !corrupted(line, end))

function completeLine(str, end) {
  let tracker = []

  for (let i = 0; i < str.length; i++) {
    if (Object.keys(end).includes(str[i])) {
      tracker.push(end[str[i]])
    } else {
      tracker.pop()
    }
  }

  return tracker.reverse().join('')
}

const pointsTwo = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

function convertLineToScore(line, points) {
  let result = 0

  for (let i = 0; i < line.length; i++) {
    result *= 5
    result += points[line[i]]
  }
  return result
}

const pointsArray = inputTwo.map(line => convertLineToScore(completeLine(line, end), pointsTwo))

function partTwo(arr) {
  return arr.sort((a, b) => b - a)[Math.floor(arr.length / 2)]
}

console.log(partTwo(pointsArray))
