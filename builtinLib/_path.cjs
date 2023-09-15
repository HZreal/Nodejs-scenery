// 路径处理
const path = require('path')

const pathStr = path.join('/aa', '/bb', 'cc')
console.log('path-------------', pathStr)


// 注意ES module中没有__dirname
var abstractPath = path.join(__dirname, './ttest.txt')
console.log(abstractPath)


var fileName = path.basename(abstractPath)
var fileName2 = path.basename(abstractPath, '.txt')    // exclude 后缀
console.log(fileName)

var extName = path.extname(abstractPath)
console.log(extName)