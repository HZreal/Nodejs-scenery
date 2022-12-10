// module内置变量
// module代表当前js模块


// 默认情况下，文件中定义的任何其他对象或变量都是私有的，不会公开给外界
// 当将对象或函数赋值为新的 exports 属性时，这就是要被公开的内容，也即是对外的接口

// require()加载模块时，实际就是加载该模块的exports属性，即module.exports

console.log(module)


// module.exports 表示当前js文件共享出去的变量，导出供其他文件访问
const car = {
    brand: 'Ford',
    model: 'Fiesta'
  }
  
module.exports = car

//在另一个文件中
// const car1 = require('./car')

// 第二种方式是将要导出的对象添加为 exports 的属性。这种方式可以导出多个对象、函数或数据
const user = {
    name: 'Ford',
    age: 22
}

module.exports.user = user


// exports也是内置全局变量
console.log(exports)
console.log(module.exports)



// const Module = require("module");
// console.log(Module.e)



// require与import的区别

//     1，require是CommonJS规范的模块化语法，import是ECMAScript 6规范的模块化语法；

//     2，require是运行时加载，import是编译时加载；

//     3，require可以写在代码的任意位置，import只能写在文件的最顶端且不可在条件语句或函数作用域中使用；

//     4，require通过module.exports导出的值就不能再变化，import通过export导出的值可以改变；

//     5；require通过module.exports导出的是exports对象，import通过export导出是指定输出的代码；

//     6，require运行时才引入模块的属性所以性能相对较低，import编译时引入模块的属性所所以性能稍高。




