/**
 * 错误 异常
 * 为什么要进行错误（Error）处理？
 *      程序崩溃退出
 *      HTTP请求无响应（web程序）
 *      数据被修改了一半，出现不一致
 *      无法定位和排查错误
 */

/**
 * js Error 对象
 */
function jsError() {
    const err = new Error('my error');
    const errName = err.name // 错误名称
    const errMessage = err.message; // 错误的描述信息
    const errStack = err.stack; // 调用堆栈信息
    // console.log('errName, errMessage, errStack  ---->  ', errName, errMessage, errStack);

    // Error的派生对象
    // SyntaxError: 解析代码时发生的语法错误
    // ReferenceError: 引用一个不存在的变量
    // RangeError: 值超出有效范围
    // TypeError: 变量或参数不符合预期类型
    // URIError: URI相关函数的参数不正确
    // EvalError: eval函数没有被正确执行

    // 自定义Error
    class customError extends Error {
        constructor(message) {
            super();
            this.name = 'customError'
            this.message = message
        }
    }

    try {
        throw new customError('something Error')
    } catch (e) {
        console.log('e.message  ---->  ', e.message);
    }

}

function exceptionCapture() {
    // 一. 同步代码的异常捕获处理
    const captureInSync = (p) => {
        try {
            throw new Error();
        } catch (err) {
            console.log('err  ---->  ', err);
        }
    }

    // 二. 异步代码的错误处理
    const captureInAsync = () => {
        try {
            setTimeout(() => {
                // 异常的抛出时间是未知的，无法捕获
                throw new Error('Error raised in unexpected time');
            }, 0)
        } catch (err) {
            // ！！！这样无法捕获到异步错误
            // javascript语言内建的异常是基于调用栈的，而异步任务是基于事件循环机制实现的，当事件队列中的回调函数执行时，任务创建时的堆栈早已不存在了。换句话说，此时try catch相关的逻辑已经执行完了，自然无法捕获错误。因此，对于异步代码，我们需要使用其他方式来处理错误。
            console.log('err  ---->  ', err);
        }
    }

    // 回调函数：第一个参数为错误对象接收错误
    const captureInCallback = () => {
        fs.readFile('./IMG_20136642.png', (err, buffer) => {
            if (err) {
                console.log(err)
            }
        });
    }

    // 通过监听 EventEmitter 对象的 error 事件进行捕获和处理
    const captureInEventEmitter = () => {
        const input = fs.createReadStream('hello.txt');
        input.on('error', (err) => {
            console.log(err);
        })
    }

    // Promise: 提供了标准的处理方法Promise.prototype.catch
    const captureInPromise = () => {
        fetch('https://www.baidu.com')
            .then(res => {
                // mock response
            })
            .catch(err => {
                console.log(err);
            })
    }

    // async/await: 对于async函数的错误处理和同步代码是一致的
    const captureInAsyncAwait = async () => {
        try {
            await fetch('https://www.baidu.com');
        } catch (err) {
            console.log(err);
        }
    }


    // captureInSync()
    // captureInAsync()
    captureInCallback()
    // captureInEventEmitter()
    // captureInPromise()
    // captureInAsyncAwait().then().catch() // 模拟 await 调用

}

function main() {
    // jsError()
    exceptionCapture()
}

main()
