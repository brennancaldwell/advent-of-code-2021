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
        if (check.length === 1) {
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

console.log(`Part One: ${partOne(boards, nums)}`)



function partTwo(arr, nums) {
    let result, current = arr, mostRecentWinner = [], winningNum = 0

    for (let i = 0; i < nums.length; i++) {

        const currentNum = nums[i]
        current = current.map(matrix => numCalled(matrix, currentNum))
        const winners = current.filter(matrix => winningBoardCheck(matrix))
        if (winners.length > 0) {
            winners.forEach(winner => {
                mostRecentWinner = winner
                winningNum = currentNum
                current.splice(current.indexOf(winner), 1)
            })
        }
    }

    return winningNum * mostRecentWinner
                        .flat()
                        .filter(val => val !== 'x')
                        .reduce((acc, val) => {
                            acc += parseInt(val)
                            return acc
                        }, 0)
}

console.log(`Part Two: ${partTwo(boards, nums)}`)
