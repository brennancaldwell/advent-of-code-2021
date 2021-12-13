const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-11.txt', 'utf-8')
const matrixOne = rawInput.split('\n').map(line => line.split('').map(num => Number(num)))
const matrixTwo = rawInput.split('\n').map(line => line.split('').map(num => Number(num)))

function partOne(matrix, steps) {
  let count = steps, flashes = 0
  while (count > 0) {
    let queue = [], flashed = new Set()
    for (let d = 0; d < matrix.length; d++) {
      for (let r = 0; r < matrix[d].length; r++) {
        matrix[d][r]++
        if (matrix[d][r] > 9) {
          queue.push(`${d},${r}`)
        }
      }
    }
    while (queue.length) {
      let [ y, x ] = queue.shift().split(',')
      y = Number(y)
      x = Number(x)
      matrix[y][x] = 0
      flashes++
      flashed.add(`${y},${x}`)

      if (y - 1 >= 0 && !flashed.has(`${y - 1},${x}`)) {
        matrix[y - 1][x]++
        if (matrix[y - 1][x] > 9) !queue.includes(`${y - 1},${x}`) && queue.push(`${y - 1},${x}`)
      }

      if (x + 1 < matrix[y].length && y - 1 >= 0 && !flashed.has(`${y - 1},${x + 1}`)) {
        matrix[y - 1][x + 1]++
        if (matrix[y - 1][x + 1] > 9) !queue.includes(`${y - 1},${x + 1}`) && queue.push(`${y - 1},${x + 1}`)
      }

      if (x - 1 >= 0 && y - 1 >= 0 && !flashed.has(`${y - 1},${x - 1}`)) {
        matrix[y - 1][x - 1]++
        if (matrix[y - 1][x - 1] > 9) !queue.includes(`${y - 1},${x - 1}`) && queue.push(`${y - 1},${x - 1}`)
      }

      if (y + 1 < matrix.length && !flashed.has(`${y + 1},${x}`)) {
        matrix[y + 1][x]++
        if (matrix[y + 1][x] > 9) !queue.includes(`${y + 1},${x}`) && queue.push(`${y + 1},${x}`)
      }

      if (x - 1 >= 0 && !flashed.has(`${y},${x - 1}`)) {
        matrix[y][x - 1]++
        if (matrix[y][x - 1] > 9) !queue.includes(`${y},${x - 1}`) && queue.push(`${y},${x - 1}`)
      }

      if (x + 1 < matrix[y].length && !flashed.has(`${y},${x + 1}`)) {
        matrix[y][x + 1]++
        if (matrix[y][x + 1] > 9) !queue.includes(`${y},${x + 1}`) && queue.push(`${y},${x + 1}`)
      }

      if (x + 1 < matrix[y].length && y + 1 < matrix.length && !flashed.has(`${y + 1},${x + 1}`)) {
        matrix[y + 1][x + 1]++
        if (matrix[y + 1][x + 1] > 9) !queue.includes(`${y + 1},${x + 1}`) && queue.push(`${y + 1},${x + 1}`)
      }

      if (x - 1 >= 0 && y + 1 < matrix.length && !flashed.has(`${y + 1},${x - 1}`)) {
        matrix[y + 1][x - 1]++
        if (matrix[y + 1][x - 1] > 9) !queue.includes(`${y + 1},${x - 1}`) && queue.push(`${y + 1},${x - 1}`)
      }
    }

    count--
  }

  return flashes
}


console.log(partOne(matrixOne, 100))

function partTwo(matrix)  {
  let count = 0, found = false
while (!found) {
  let queue = [], flashed = new Set()

  for (let d = 0; d < matrix.length; d++) {
    for (let r = 0; r < matrix[d].length; r++) {
      matrix[d][r]++
      if (matrix[d][r] > 9) {
        queue.push(`${d},${r}`)
      }
    }
  }

  count++

  while (queue.length) {
    let [ y, x ] = queue.shift().split(',')
    y = Number(y)
    x = Number(x)
    matrix[y][x] = 0
    flashed.add(`${y},${x}`)
    if (y - 1 >= 0 && !flashed.has(`${y - 1},${x}`)) {
      matrix[y - 1][x]++
      if (matrix[y - 1][x] > 9) !queue.includes(`${y - 1},${x}`) && queue.push(`${y - 1},${x}`)
    }

    if (x + 1 < matrix[y].length && y - 1 >= 0 && !flashed.has(`${y - 1},${x + 1}`)) {
      matrix[y - 1][x + 1]++
      if (matrix[y - 1][x + 1] > 9) !queue.includes(`${y - 1},${x + 1}`) && queue.push(`${y - 1},${x + 1}`)
    }

    if (x - 1 >= 0 && y - 1 >= 0 && !flashed.has(`${y - 1},${x - 1}`)) {
      matrix[y - 1][x - 1]++
      if (matrix[y - 1][x - 1] > 9) !queue.includes(`${y - 1},${x - 1}`) && queue.push(`${y - 1},${x - 1}`)
    }

    if (y + 1 < matrix.length && !flashed.has(`${y + 1},${x}`)) {
      matrix[y + 1][x]++
      if (matrix[y + 1][x] > 9) !queue.includes(`${y + 1},${x}`) && queue.push(`${y + 1},${x}`)
    }

    if (x - 1 >= 0 && !flashed.has(`${y},${x - 1}`)) {
      matrix[y][x - 1]++
      if (matrix[y][x - 1] > 9) !queue.includes(`${y},${x - 1}`) && queue.push(`${y},${x - 1}`)
    }

    if (x + 1 < matrix[y].length && !flashed.has(`${y},${x + 1}`)) {
      matrix[y][x + 1]++
      if (matrix[y][x + 1] > 9) !queue.includes(`${y},${x + 1}`) && queue.push(`${y},${x + 1}`)
    }

    if (x + 1 < matrix[y].length && y + 1 < matrix.length && !flashed.has(`${y + 1},${x + 1}`)) {
      matrix[y + 1][x + 1]++
      if (matrix[y + 1][x + 1] > 9) !queue.includes(`${y + 1},${x + 1}`) && queue.push(`${y + 1},${x + 1}`)
    }

    if (x - 1 >= 0 && y + 1 < matrix.length && !flashed.has(`${y + 1},${x - 1}`)) {
      matrix[y + 1][x - 1]++
      if (matrix[y + 1][x - 1] > 9) !queue.includes(`${y + 1},${x - 1}`) && queue.push(`${y + 1},${x - 1}`)
    }
  }

  if (flashed.size === (matrix.length * matrix[0].length)) {
    console.log(matrix)
    found = true
  }
}

return count
}

console.log(partTwo(matrixTwo))