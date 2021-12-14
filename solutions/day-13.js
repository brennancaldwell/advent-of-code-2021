const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-13.txt', 'utf-8')
const instructionsRaw = rawInput.split('\n\n')[1]
const dotsRaw = rawInput.split('\n\n')[0]

const dots = dotsRaw.split('\n').map(line => line.split(',').map(num => Number(num)))
const folds = instructionsRaw.split('\n').map(line => line.split('=')).map(val => {return { [val[0][val[0].length - 1]]: Number(val[1]) }})

const maxValY = Math.max(...dots.map(val => val[1]))
const maxValX = Math.max(...dots.map(val => val[0]))

let matrix = []
for (let y = 0; y <= maxValY; y++) {
    const row = []
    for (let x = 0; x <= maxValX; x++) {
        row.push('.')
    }
    matrix.push(row)
}

for (let i = 0; i < dots.length; i++) {
    const x = dots[i][0]
    const y = dots[i][1]
    matrix[y][x] = '#'
}

function fold(matrix, direction) {
    if (direction.y) {
        const newMatrix = []
        for (let r = 0; r < direction.y; r++) {
            const row = []
            for (let c = 0; c < matrix[r].length; c++) {
                row.push(matrix[r][c])
            }
            newMatrix.push(row)
        }

        const diff = matrix.slice(direction.y + 1)

        for (let y = diff.length - 1; y >= 0; y--) {
            for (let x = 0; x < newMatrix[y].length; x++) {
                if (diff[y][x] === '#') {
                    newMatrix[newMatrix.length - 1 - y][x] = '#'
                }
            }
        }
        
        return newMatrix
    } else if (direction.x) {
        const newMatrix = []
        for (let r = 0; r < matrix.length; r++) {
            const row = []
            for (let c = 0; c < matrix[r].length - direction.x; c++) {
                let left = matrix[r][direction.x - (c + 1)] ? matrix[r][direction.x - (c + 1)] : '.'
                let right = matrix[r][direction.x + (c + 1)] ? matrix[r][direction.x + (c + 1)] : '.'
                if (left === '#' || right === '#') {
                    row.push('#')
                } else {
                    row.push('.')
                }
            }
            newMatrix.push(row)
        }
        return newMatrix
    }
}

const partOne = fold(matrix, {x: 655})

console.log(partOne.flat().filter(val => val === '#').length)

