const fs = require('fs')

const rawInput = fs.readFileSync('././inputs/day-14.txt', 'utf-8')
const polymer = rawInput.split('\n\n')[0]
const rules = rawInput.split('\n\n')[1].split('\n').map(duple => duple.split(' -> ')).reduce((acc, val) => {
    acc[val[0]] = val[1]
    return acc
}, {})

function partOne(steps, string, rules) {
    let count = steps, polymer = string

    while (count > 0) {
        const queue = []
        let insertions = 0

        for (let i = 0; i < polymer.length - 1; i++) {
            const pair = `${polymer[i]}${polymer[i + 1]}`
            if (rules[pair]) {
                queue.push({insert: rules[pair], idx: i + 1})
            }
        }

        while (queue.length) {
            const { insert, idx } = queue.shift()
            polymer = polymer.slice(0, idx + insertions) + insert + polymer.slice(idx + insertions)
            insertions++
        }

        count--
    }
    let counts = polymer.split('').reduce((acc, val) => {
        acc[val]
        ? acc[val]++
        : acc[val] = 1
        return acc
    }, {})
    return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
}

console.log(partOne(10, polymer, rules))