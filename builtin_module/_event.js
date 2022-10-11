// 模块 Events（EventEmitter 事件触发器），也称为发布/订阅模式
// Net、HTTP、FS、Stream 等，除了这些系统模块比较知名的 Express、Koa 框架中也能看到 EventEmitter 的踪迹



import {EventEmitter} from 'events';
const emitter = new EventEmitter();



emitter.on("起床", function(time) {
    console.log(`早上 ${time} 开始起床，新的一天加油！`)
    //console.log(`关注公众号Nodejs技术栈，早上 ${time} 点开始起床阅读，从 Node.js 技术栈`);
});

emitter.emit("起床", "6:00");

console.log('----------------');