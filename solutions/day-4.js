const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-4.txt', 'utf-8')
const inputs = rawInput.split('\n\n')

const nums = inputs[0].split(',')
const boards = inputs.slice(1).map(brd => brd.split('\n').map(line => line.split(' ').filter(val => val !== '')))

function numCalled(matrix, num) {
    return matrix.map((line, i) => {
        if (line.includes(num)) return line.map(val => val === num ? 'x' : val)
        else return line
    })
}

function winningBoardCheck(matrix) {
    const fullMatrix = [...matrix], verticals = new Array(matrix.length);

    let winner = false
    for (let i = 0; i < matrix.length; i++) {
        for (let x = 0; x < matrix[i].length; x++) {
            verticals[x] = verticals[x] || []
            verticals[x].push(matrix[i][x])
        }
    }
    fullMatrix.push(...verticals)
    fullMatrix.forEach(line => {
        if (line.every(val => val === 'x')) winner = true
    })
    
    return winner
}

function partOne(arr, nums) {
    let result, current = arr

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i]
        current = current.map(matrix => numCalled(matrix, currentNum))
        const check = current.filter(matrix => winningBoardCheck(matrix))
        if (check.length > 0) {
            const remainingNums = check[0].flat().filter(val => val !== 'x')
            result = parseInt(currentNum) * remainingNums.reduce((acc, val) => {
                acc += parseInt(val)
                return acc
            }, 0)
            break
        }
    }

    return result
}

console.log(partOne(boards, nums))
