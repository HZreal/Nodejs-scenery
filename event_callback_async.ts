


// js默认情况下是同步的，并且是单线程的。 这意味着代码无法创建新的线程并且不能并行运行。
// 那么如何异步？

// 事件回调
// 事件处理程序会接受一个回调函数，该函数会在该事件被触发时被调用，回调是一个简单的函数，会作为值被传给另一个函数，并且仅在事件发生时才被执行。
setTimeout(() => {
    console.log('task is running ...');
 }, 1000);

// 当有很多回调时，代码就会很快变得非常复杂，嵌套层次很深，于是，从 ES6 开始，js引入了Promise，可以帮助处理异步代码而不涉及使用回调



// Promise
const done = true
// Promise 构造函数只有一个参数，且这个参数是一个函数，这个函数(称起始函数)包含两个参数 resolve 和 reject
// resolve 和 reject 也都是函数，其中 resolve 代表正常时的调用，reject 是出现异常时的调用，使用 resolve 和 reject，可以向调用者传达最终的 promise 状态以及该如何处理
// 当构造promise并调用后，起始函数会直接被异步运行，promise会以 `处理中状态` 开始，最终会以 `被解决状态` 或 `被拒绝状态` 结束，并在完成时根据状态调用相应的回调函数（传给 then 和 catch）
// new Promise((resolve, reject) => {
//     if (done) {
//         // promise 进入被解决状态
//         resolve();
//     } else {
//         // promise 置于被拒绝状态
//         reject()
//     }
// });

// Promise 类有 .then() .catch() 和 .finally() 三个方法，这三个方法的参数都是一个基于promise结果状态的回调函数
// .then()         可以将参数中的函数添加到当前 Promise 的正常执行序列，传入的函数会按顺序依次执行回调
// .catch ()       则是设定 Promise 的异常处理序列，有任何异常都会直接跳到 catch 序列执行回调
// .finally()      是在 Promise 执行的最后一定会执行的序列
// resolve() 中可以放置一个实参用于向下一个 then 传递值，reejct() 中也可以向 catch 传递值
// then() 中的函数也可以返回一个值传递给 then。但是，如果 then 中返回的是一个 Promise 对象，那么下一个 then 将相当于对这个返回的 Promise 进行操作
// 但是请注意以下两点：
//      resolve 和 reject 的作用域只有起始函数，不包括 then 以及其他序列；
//      resolve 和 reject 并不能够使起始函数停止运行，别忘了 return。
new Promise((resolve, reject) => {
    if (done) {
        // promise 进入被解决状态
        resolve('OK');        // 向后续then方法的回调函数传参
    } else {
        // promise 置于被拒绝状态
        reject('error')       // 向后续catch方法的回调函数传参
    }
}).then((data) => {
    console.log(`data ${data} from resolve function `);
    // return继续向下一个then传参，而非退出，事实上也无法退出，只能通过throw抛异常跳转进入catch实现退出
    return data
}).then((data) => {
    console.log(`data ${data} from last then function `);
}).catch((err) => {
    console.log(`error ${err} from reject function `);
});

// FAQ :
//      Q: then、catch 和 finally 序列能否顺序颠倒？
//      A: 可以，效果完全一样。但不建议这样做，最好按 then-catch-finally 的顺序编写程序。
     
//      Q: 除了 then 块以外，其它两种块能否多次使用？
//      A: 可以，多个 finally (与 then 一样) 会按顺序执行，这样没有意义。当有异常时，就算有多个 catch 块也只会执行第一个，若 catch 块里还有异常，依然可继续执行后面的 catch 块，这样也没意义。所以最好只使用一个 catch 和 finally 块。
     
//      Q: then 块如何中断？
//      A: then 块默认会向下顺序执行，即使有 return 也不能中断，但可以通过 throw 来跳转至 catch 实现中断。
     
//      Q: 什么时候适合用 Promise 而不是传统回调函数？
//      A: 当需要多次顺序执行异步操作的时候，例如，如果想通过异步方法先后检测用户名和密码，需要先异步检测用户名，然后再异步检测密码的情况下就很适合 Promise。
     
//      Q: Promise 是一种将异步转换为同步的方法吗？
//      A: 完全不是。Promise 只不过是一种更良好的编程风格，将嵌套格式的代码变成了顺序格式的代码。
     
//      Q: 什么时候我们需要再写一个 then 而不是在当前的 then 接着编程？
//      A: 当前异步任务完成而又需要调用一个异步任务的时候。

// demo1
const fs = require('fs')
const getFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}
getFile('./package.json').then((data) => {
    console.log(`read file successfully, data is ${data}`);
}).catch((err) => {
    console.log(`read file failed, error is ${err}`);
})

// Fetch API 是基于 promise 的机制，调用 fetch() 相当于使用 new Promise() 来定义 promsie
// ps:  fetch API 没有在 Node 中实现，node中应该安装node-fetch
// fetch('./package.json').then((response) => {
//     if (response.status >= 200 && response.status < 300) {
//         return Promise.resolve(response)
//     }
//     return Promise.reject(new Error(response.statusText))
// })
//   .then((response) => response.json())      // 这里唯一的区别是的 `json` 函数会返回解决时传入 `data` 的 promise，
//   .then((data) => {  // 这是 `data` 会在此处作为匿名函数的第一个参数的原因。
//     console.log('请求成功获得 JSON 响应', data)
//   })
//   .catch((err) => {
//     console.log('请求失败', err)
//   })

//
// Promise.all()
// Promise.race()



// 基于Promise机制和规范，一个Promise应该包含以下数据结构：
// interface IPromise {
//     status: STATUS // 表明当前Promise的状态，不可逆，在进行then添加方法时，会根据这个状态做出不同的处理；状态可为PENDING、FULFILLED、REJECTED
//     value: any // 异步函数执行成功后返回的值
//     reason: any // 异步函数执行失败后返回的值
//     onResolvedCallbacks: Function[] // 保存then方法添加的成功后执行函数
//     onRejectCallbacks: Function[] // 保存then方法添加的失败后的执行函数
//   }

// JS是异步非阻塞单线程的语言，遇到异步任务时，将会向事件队列添加一个函数，直到异步任务完成时，线程再执行这个函数，基于此，在JS中很多地方用到了订阅者模式
// Promise正好是一个发布订阅者模式的实现。executor就是我们添加的订阅的数据源，我们向这个源注册了两个钩子resolve, reject,分别在异步事件的成功和失败时执行，相当于订阅者的notify方法。
// 而then方法则是向订阅者注册事件。

// 自己简单模拟实现promise
enum STATUS {        // promise状态
  PENDING,
  FULFILLED,
  REJECTED
}

class MyPromise {
  private status: STATUS
  private value: any
  private reason: any
  private onResolvedCallbacks: Function [] = []
  private onRejectCallbacks: Function [] = []
  
  constructor(executor: Function) {
    const self = this

    function resolve(value: any) {
      // 改变当前Promise的状态
      if (self.status === STATUS.PENDING) {
          self.status = STATUS.FULFILLED
          self.value = value
          self.onResolvedCallbacks.forEach(fun => {
          fun(self.value)
        })
      }
    }

    function reject(reason: any) {
      if (self.status === STATUS.PENDING) {
          self.status = STATUS.REJECTED
          self.reason = reason
          self.onRejectCallbacks.forEach(fun => fun(reason))
      }
    }
  }
  
  public then(onFulfilled: Function, onReject?: Function) {
    this.onResolvedCallbacks.push(onFulfilled)
    if (onReject) {
      this.onRejectCallbacks.push(onReject)
      return
    }
    return this
  }
}




// Promise引入解决了回调层次过深不易开发的问题，使嵌套格式的代码变成了顺序格式的代码。为了进一步优化格式，ES2017提供如下方式，用同步的方式写异步代码
// async & await
// // 在任何函数之前加上 async 关键字意味着该函数会返回 promise
// await 指令后必须跟着一个 Promise，异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。
// 异步函数实际上原理与 Promise 原生 API 的机制是一模一样的，只不过更便于程序员阅读





