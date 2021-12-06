const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-5.txt', 'utf-8')
const array = rawInput.split('\n').map(line => line.split(' -> ').map(pair => {
  const duple = pair.split(',')
  return { x: Number(duple[0]), y: Number(duple[1])}
}))

const partOneInput = array.filter(cp => {
  return (cp[0].x === cp[1].x) || (cp[0].y === cp[1].y)
})

function partOne(arr) {
  const intersectionTracker = {}

  arr.forEach(pair => {
    const axis = pair[0].x === pair[1].x ? 'y' : 'x'
    let min = Math.min(pair[0][axis], pair[1][axis])
    const max = Math.max(pair[0][axis], pair[1][axis])
    while (min <= max) {
      if (axis === 'x') {
        intersectionTracker[`${min},${pair[0].y}`]
        ? intersectionTracker[`${min},${pair[0].y}`]++
        : intersectionTracker[`${min},${pair[0].y}`] = 1
      } else {
        intersectionTracker[`${pair[0].x},${min}`]
        ? intersectionTracker[`${pair[0].x},${min}`]++
        : intersectionTracker[`${pair[0].x},${min}`] = 1
      }
      min++
    }
  })

  return Object.values(intersectionTracker).filter(val => val >= 2).length
}

console.log(partOne(partOneInput))


function partTwo(array) {
  const intersectionTracker = {}

  for (let i = 0; i < array.length; i++) {
    let x1 = array[i][0].x,
        x2 = array[i][1].x,
        y1 = array[i][0].y,
        y2 = array[i][1].y

    if (x1 === x2 || y1 === y2) {
      const axis = x1 === x2? 'y' : 'x'
      let min = Math.min(array[i][0][axis], array[i][1][axis])
      const max = Math.max(array[i][0][axis], array[i][1][axis])
      while (min <= max) {
        if (axis === 'x') {
          intersectionTracker[`${min},${y1}`]
          ? intersectionTracker[`${min},${y1}`]++
          : intersectionTracker[`${min},${y1}`] = 1
        } else {
          intersectionTracker[`${x1},${min}`]
          ? intersectionTracker[`${x1},${min}`]++
          : intersectionTracker[`${x1},${min}`] = 1
        }
        min++
      }
    } else {
      if (x1 < x2 && y1 < y2) {
        while (x1 <= x2 && y1 <= y2) {
          intersectionTracker[`${x1},${y1}`]
          ? intersectionTracker[`${x1},${y1}`]++
          : intersectionTracker[`${x1},${y1}`] = 1
          x1++
          y1++
        }
      } else if (x1 < x2 && y1 > y2) {
        while (x1 <= x2 && y1 >= y2) {
          intersectionTracker[`${x1},${y1}`]
          ? intersectionTracker[`${x1},${y1}`]++
          : intersectionTracker[`${x1},${y1}`] = 1
          x1++
          y1--
        }
      } else if (x1 > x2 && y1 < y2) {
        while (x1 >= x2 && y1 <= y2) {
          intersectionTracker[`${x1},${y1}`]
          ? intersectionTracker[`${x1},${y1}`]++
          : intersectionTracker[`${x1},${y1}`] = 1
          x1--
          y1++
        }
      } else {
        while (x1 >= x2 && y1 >= y2) {
          intersectionTracker[`${x1},${y1}`]
          ? intersectionTracker[`${x1},${y1}`]++
          : intersectionTracker[`${x1},${y1}`] = 1
          x1--
          y1--
        }
      }
    }
  }

  return Object.values(intersectionTracker).filter(val => val >= 2).length
}

console.log(partTwo(array))