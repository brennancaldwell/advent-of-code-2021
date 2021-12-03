const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-3.txt', 'utf-8')

const array = rawInput.split('\n')

/* Will I ever learn bit manipulation? Not today, Satan. */

function partOne(arr) {

  const bitTracker = new Array(arr[0].length)
  let gamma = '', epsilon = ''

  for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr[i].length; x++) {
      if (bitTracker[x] === undefined) bitTracker[x] = []
      bitTracker[x][arr[i][x]]
      ? bitTracker[x][arr[i][x]]++
      : bitTracker[x][arr[i][x]] = 1
    }
  }

  bitTracker.forEach(duple => {
    gamma += duple.indexOf(Math.max(...duple))
    epsilon += duple.indexOf(Math.min(...duple))
  })

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

console.log(partOne(array))




function commonValues(arr, which) {

  const bitTracker = new Array(arr[0].length)

  for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr[i].length; x++) {
      if (bitTracker[x] === undefined) bitTracker[x] = []
      bitTracker[x][arr[i][x]]
      ? bitTracker[x][arr[i][x]]++
      : bitTracker[x][arr[i][x]] = 1
    }
  }

  const mcv = bitTracker.map(duple => {
    const num = which === 'mcv'
    ? Math.max(duple[0] || -Infinity, duple[1] || -Infinity)
    : Math.min(duple[0] || Infinity, duple[1] || Infinity)
    if (duple[0] === duple[1]) return which === 'mcv' ? 1 : 0
    else return duple.indexOf(num)
  })

  return mcv
}

function determine(arr, param) {
  let vals = arr.slice(),
      cv = commonValues(vals, param),
      i = 0

  while (vals.length > 1) {
    vals = vals.filter(binary => parseInt(binary[i]) === cv[i])
    cv = commonValues(vals, param)
    i++
  }

  return parseInt(vals[0], 2)
}


function partTwo(arr) {
  return determine(arr, 'mcv') * determine(arr, 'lcv')
}

console.log(partTwo(array))

/*

Some fun JS takeaways here:

When you pass Array(n).fill() an object, it will fill all n indices with the SAME OBJECT. :)

Math.max() & Math.min() will return NaN if one of the arguments is undefined.

*/