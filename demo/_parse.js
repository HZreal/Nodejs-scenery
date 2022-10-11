import {readFileSync, writeFileSync} from "fs";

const readRes = readFileSync('111.txt').toString()
// console.log(readRes)


function run(fullStr, regex) {

    let ret = []
    while (true) {
        let r1 = fullStr.match(regex)
        if (r1 == null) {
            break
        }
        console.log('r1 ---------', r1)
        let level = r1[0].split(' ')[1]
        ret.push(level)

        fullStr = fullStr.replace(r1, '===')

    }
    return ret
}

const rrr1 = run(readRes, '层级 \\d+')
console.log('rrr1============', rrr1)

const rrr2 = run(readRes, '高度 \\d+\\.\\d+')
console.log('rrr2============', rrr2)

let res = []
rrr1.forEach((level, index) => {
    res.push({level: Number(level), alt: Number(rrr2[index])})
})
console.log('===res===', res)

const content = JSON.stringify(res)

writeFileSync('333.txt', content)

