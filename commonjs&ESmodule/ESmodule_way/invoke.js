// invoke.js           引入模块，来调用


// ===========================================ES module方式=================================================
// 注意 package.json中 type 为 module


// 单个属性的导入
// import {a, count} from './beCalled.js'
// console.log(a)   //  1
// count()        //  2


// //列表方式引入
// import { firstName, lastName } from "./beCalled.js";
// console.log("列表" + firstName, lastName);        //列表 liu kaka
// //重命名引入
// import { first, last } from "./beCalled.js";
// console.log("重命名" + first, last);              //重命名 liu kaka


// 默认导入
// import func from "./beCalled.js"        // 这里的func可自定义名称，可以任意变量名来接收这个模块
// func()        // default  默认导出


// 导入所有模块
//文件名 index.js
import * as hello from './beCalled.js';        // as 后面取别名，自定义的变量名来接收
console.log(hello);
// 打印输出：
// [Module: null prototype] {
//     a: 1,
//     count: [Function: count],
//     default: [Function: foo],
//     first: 'liu',
//     firstName: 'liu',
//     last: 'kaka',
//     lastName: 'kaka'
// }











