import * as fs from 'fs'
import * as path from 'path'


// 注意： 文件路径是以当前node执行命令所在目录作为基准进行拼接，而不是当前js文件所在目录作为基准
// 如 F:\nodejs\nodejs-scenery> node .\builtin_module\_fs.js 会报错

// var pathStr = './ttest.txt'
var pathStr = path.join('./', '/ttest.txt')


// fs.readFile(pathStr, (err, data) => {
//     if (err) {
//         console.log('读取失败的错误-----', err.message)
//     }
//     console.log('读取成功的数据-----', data.toString())     // buffer

// })

// var content = 'ni hhhhhhha ! \n qwer'
// fs.writeFile('./ttest.txt', content, (err) => {
//     if (err) {
//         console.log('写入失败的错误-----', err.message)
//     }
// })


// 同步读写
const data = fs.readFileSync(pathStr).toString()
console.log(data);


// const content = ''
// fs.writeFileSync(pathStr, content)




