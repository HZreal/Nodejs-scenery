/**
 * 错误 异常
 *
 * 参考: https://mainpage.github.io/2020/07/05/error-and-exception/
 *
 * 为什么要进行错误（Error）处理？
 *      程序崩溃退出
 *      HTTP请求无响应（web程序）
 *      数据被修改了一半，出现不一致
 *      无法定位和排查错误
 *
 *  作用:
 *      避免程序崩溃或无响应
 *      控制错误终端的位置，必要的情况执行回滚操作，保证数据一致性
 *      记录错误的信息、调用栈、上下文等，能够快速发现、定位和解决问题
 */
import * as fs from 'fs';

/**
 * js Error 对象
 */
function jsError() {
    const err = new Error('my error');
    const errName = err.name // 错误名称
    const errMessage = err.message; // 错误的描述信息
    const errStack = err.stack; // 调用堆栈信息
    
    // console.log('errName, errMessage, errStack  ---->  ', errName, errMessage, errStack);

    // Error.captureStackTrace()

    // Error的派生对象
    // https://blog.bitsrc.io/types-of-native-errors-in-javascript-you-must-know-b8238d40e492
    // 1. SyntaxError: 解析代码时发生的语法错误，例如：
    // let cat h = "cat"

    // 2. ReferenceError: 引用一个不存在的变量，例如：
    // const cat = "cat"
    // console.log(dog)

    // 3. RangeError: 值超出有效范围，例如：
    // const arr = [90,88]
    // arr.length=90**99

    // 4. TypeError: 变量或参数不符合预期类型，例如：
    // const num = 123
    // num.toUpperCase()

    // 5. URIError: URI相关函数的参数不正确，例如：
    // decodeURI("%")

    // 6. EvalError: eval函数没有被正确执行，例如：
    // eval()

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

/**
 * js 错误捕获分析
 */
function exceptionCapture() {
    // 一. 同步代码的异常捕获处理
    const captureInSync = () => {
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
    // captureInCallback()
    // captureInEventEmitter()
    // captureInPromise()
    // captureInAsyncAwait().then().catch() // 模拟 await 调用

}

/**
 * 错误类型
 */
function errorTypes() {
    // 编码错误: 是程序员导致的bug，
    // 操作错误: 程序正常运行过程中产生的异常情况，是程序正常操作的一部分

    // 错误的传播
    // 当一个异常被抛出后，会沿着函数调用栈向上传播，直到遇到第一个catch语句。如果开发者没有手动catch，node进程最终会抛出uncaughtException事件。如果uncaughtException没有被监听，那么node进程会打印错误信息并退出。
    // 基于异常传播的机制，我们实际上可以在调用链任意位置捕获错误。

    // Error 处理策略
    // 当即处理：可预期的错误，且当前具备处理条件时，直接进行处理
    // 抛给上层：当前没有能力处理的错误，可以抛给上层
    // crash 进程：不可预期、无法处理的错误，直接crash
}

/**
 * web应用错误处理
 */
function errorWrapper() {
    // web开发对错误进行分类：js错误、应用系统异常、应用业务错误

    // 何时处理错误或异常？
    // 1. 就近处理
    // 2. controller层统一处理
    // 3. 中间件统一处理 + 全局异常错误码

    // 基于 js 内置 Error 做封装
    /**
     * 系统异常
     */
    class Exception extends Error {
        // info属性来携带异常发生时有价值的上下文信息
        info;

        constructor(info) {
            super();
            this.info = info
        }
    }

    /**
     * 业务异常
     */
    class BusinessException extends Exception {
        // code、resMsg属性来表示接口错误码和提示信息。
        code;
        msg;

        constructor(code, msg) {
            super();
            this.code = code;
            this.msg = msg;
        }

    }

    // 通过全局中间件进行处理
}

function main() {
    jsError()
    // exceptionCapture()
    // errorTypes()

}

main()
