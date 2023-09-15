// invoke.js           引入模块，来调用


// ===========================================CommonJS方式=================================================
// 注意 package.json中 type 为 commonjs，或者不指定
// 导入
// 要运用 require() 命令
let obj = require('./beCalled.js')
console.log(obj);

//对象的解构形式
let {aa, add} = require('./beCalled.js')
console.log(aa, add);







