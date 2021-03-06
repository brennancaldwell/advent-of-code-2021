const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-8.txt', 'utf-8')

const array = rawInput.split('\n').map(line => line.split(' | ').map(piece => piece.split(' ').map(ltrs => ltrs.split('').sort().join(''))))

function isUnique(len) {
  return len === 2 || len === 4 || len === 3 || len === 7
}

const partOne = array.reduce((acc, duple) => {
  acc += duple[1].filter(output => isUnique(output.length)).length
  return acc
}, 0)

console.log(partOne)


function calculateMap(arr) {
  const nums = {}
  const barCount = arr.reduce((acc, val) => {
    acc[val.length]
    ? acc[val.length].push(val)
    : acc[val.length] = [val]
    return acc
  }, {})

  nums[1] = barCount[2][0], nums[4] = barCount[4][0],
  nums[7] = barCount[3][0], nums[8] = barCount[7][0]

  let top, topR, botL

  // Whatever is in 7 and not 1 is the top bar.
  top = nums[7].split('').filter(val => !nums[1].includes(val))[0]

  // Whatever in 8 that doesn't appear in the top bar or 4 is either [botL, bot].
  // Whichever from [botL, bot] is not in [0, 6, 9] (bar count 6) is botL --  and the number in which it doesn't appear is 9.
  nums[8].split('').filter(val => !`${nums[4]}${top}`.includes(val)).forEach(ltr => {
    if (!barCount[6].every(str => str.includes(ltr))) {
      botL = ltr
      nums[9] = barCount[6].filter(str => !str.includes(ltr))[0]
      barCount[6].splice(barCount[6].indexOf(nums[9]), 1)
    }
  })

  // Whichever from [2, 3, 5] (bar count 5) has botL is 2.
  nums[2] = barCount[5].filter(str => str.includes(botL))[0]
  barCount[5].splice(barCount[5].indexOf(nums[2]), 1)

  // Whichever is in 1 but not in [3, 5] (remaining bar count 5) is topR
  nums[1].split('').forEach(num => {
    if (!barCount[5].every(str => str.includes(num))) topR = num
  })

  // whichever [0, 6] does not have topR is 6, other is 0
  barCount[6].forEach(str => {
    if (!str.includes(topR)) nums[6] = str
    else nums[0] = str
  })

  // whichever [3, 5] does not have topR is 5, other 3
  barCount[5].forEach(str => {
    if (!str.includes(topR)) nums[5] = str
    else nums[3] = str
  })

  //flip object to return
  return Object.keys(nums).reduce((acc, val) => {
    acc[nums[val]] = val
    return acc
  }, {})
}

function partTwo(arr) {
  let total = 0

  for (let i = 0; i < arr.length; i++) {
    const map = calculateMap(arr[i][0])
    let str = ''
    arr[i][1].forEach(cipher => str += map[cipher])
    total += Number(str)
  }

  return total
}

console.log(partTwo(array))