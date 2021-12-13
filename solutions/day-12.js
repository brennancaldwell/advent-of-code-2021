const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-12.txt', 'utf-8')
const array = rawInput.split('\n').map(line => line.split('-'))

const lowerCase = new Set(array.flat().filter(str => str.toLowerCase() === str && str !== 'start' && str !== 'end'))

const map = array.reduce((acc, val) => {
  if (val[0] !== 'end' && val[1] !== 'start') {
    acc[val[0]]
    ? acc[val[0]].push(val[1])
    : acc[val[0]] = [val[1]]
  }

  if (val[1] !== 'end' && val[0] !== 'start') {
    acc[val[1]]
    ? acc[val[1]].push(val[0])
    : acc[val[1]] = [val[0]]
  }

  return acc
}, {})

function findPaths(start, map, lowerCase) {
  const paths = []

  function traverse(start, map, current, lowerCase) {
    if (start === 'end') {
      paths.push(current)
      return
    }

    for (let i = 0; i < map[start].length; i++) {
      if (!lowerCase.has(map[start][i]) || !current.includes(map[start][i])) {
        traverse(map[start][i], map, current.concat(map[start][i]), lowerCase)
      }
    }
  }

  traverse(start, map, [start], lowerCase)

  return paths.length
}

console.log(findPaths('start', map, lowerCase))