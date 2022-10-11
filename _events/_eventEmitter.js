// 模块 Events（EventEmitter 事件触发器），也称为发布/订阅模式
// 在 Node.js 中绝大多数模块都依赖于此，例如 Net、HTTP、FS、Stream 等，除了这些系统模块比较知名的 Express、Koa 框架中也能看到 EventEmitter 的踪迹
// 与浏览器中的事件不同的是它不存在事件冒泡、preventDefault()、stopPropagation() 等方法，EventEmitter 提供了 on()、once()、removeListener() 等方法来对事件进行监听移除。
// doc: http://nodejs.cn/api/events.html

// emit：触发一个监听函数，第一个参数是事件名称，第二个参数是发送的数据
// on：注册一个监听函数，第一个参数是事件名称，第二个参数是此事件的监听器



import {EventEmitter} from "events";
// const EventEmitter = require('events').EventEmitter;     // CommonJS

// const emitter = new EventEmitter();
// emitter.on("work_event", (time) => {
//     console.log(`早上 ${time} 开始起床，新的一天加油！`)
// });
// emitter.emit("work_event", "6:00");


// 基于 EventEmitter 的自定义类
// 自定义的 OneDayPlan 继承自 EventEmitter
const oneDayPlanRun = {
    '6:00': function () {
        console.log(`现在是早上 6:00，起床，开始新的一天加油！`);
    },
    '7:00': function () {
        console.log(`现在是早上 7:00，吃早饭！`);
    }
}

function OneDayPlan() {
    EventEmitter.call(this);
}

Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype);
Object.setPrototypeOf(OneDayPlan, EventEmitter);

const oneDayPlan = new OneDayPlan();

oneDayPlan.on("6:00", function() {
    oneDayPlanRun["6:00"]();
});

oneDayPlan.on("7:00", function() {
    oneDayPlanRun["7:00"]();
});

// 实现sleep休眠
async function sleep(sep) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(1);
        }, sep);
    });
}

async function doMain() {
    oneDayPlan.emit("6:00");

    await sleep(2000); // 间隔 2 秒钟输出

    oneDayPlan.emit("7:00");
}

// doMain();


// EventEmitter 解决高并发下雪崩问题
// 背景：对于需要查询 DB 的数据，我们一般称之为热点数据，这类数据通常是要在 DB 之上增加一层缓存，但是在高并发场景下，如果这个缓存正好失效，此时就会有大量的请求直接涌入数据库，对数据库造成一定的压力，对于缓存雪崩的解决方案，网上也不乏有更好的解决方案，但是在 Node.js 中我们可以利用 events 模块提供的 once() 方法来解决。
// 当触发多次相同名称事件，通过 once 添加的侦听器只会执行一次，并且在执行之后会接触与它关联的事件
// 相当于 on 方法和 removeListener 方法的组合，
// const proxy = new EventEmitter()
// proxy.once('我很帅', () => {
//     console.log('once: 我很帅！');
// });
//
// proxy.on('我很帅', () => {
//     console.log('on: 我很帅！');
// });
//
// proxy.emit('我很帅');
// proxy.emit('我很帅');
// proxy.emit('我很帅');
// 上面触发了三次 “我很帅” 事件，on 方法乖乖的重复了三次，但是 once 方法仅触发一次



// EventEmitter 会按照监听器注册的顺序同步地调用所有监听器。 所以必须确保事件的排序正确，且避免竞态条件
// const emitter3 = new EventEmitter();
// emitter3.on('test',() => {
//     console.log(111)
// });
// emitter3.emit('test');
// console.log(222)
// 输出
// 111
// 222

// 可以使用 setImmediate() 或 process.nextTick() 切换到异步模式，代码如下
// emitter3.on('test',() => {
//     setImmediate(() => {
//         console.log(111);
//     });
// });
// emitter3.emit('test');
// console.log(222)
// 输出
// 222
// 111


// 事件触发器带有错误信息，而没有相应的错误监听在，会导致进程退出
const emitter4 = new EventEmitter();
// emitter4.emit('error', new Error('This is a error'));
// console.log('test');   // 调用后程序崩溃导致 Node 进程自动退出，因受上一行的影响，此行的 console.log('test'); 也不会得到执行。
// 应该始终为 'error' 事件注册监听器
emitter4.on('error', function(err) {
    console.error('error from callback ----->  ', err);
})
emitter4.emit('error', new Error('This is a error'));
console.log('continue going as error is handled while raised');




















