/**
 * TODO 数据类型
 */
function dataType(){

}


/**
 * 异常捕获
 */
function exceptionCapture() {
    const beInvokedFunc = (p)=> {
        try {
            // mock 数据库查询 p

            // TODO
            throw new Error();
        } catch (err) {
            console.log('err  ---->  ', err);
            return null
        }
    }
    const invoker=()=> {
        try {
            const result = beInvokedFunc('c');
            console.log('result  ---->  ', result);
        } catch (err) {
            console.log('err  ---->  ', err);
        }
    }
    invoker()
}

/**
 * 模块引入
 */
const {add} = require('./myModule/public')
// import {sub} from './myModule/public' // ES module
function introduceModule() {
    const a = 1
    const b = 2
    console.log('add(a, b)  ---->  ', add(a, b));
    // console.log('sub(b, a)  ---->  ', sub(b, a));
}


/**
 * 全局对象
 */
function globalObject() {
    __dirname
    __filename
    console
    global
    exports
    module
    process
    TextEncoder
    TextDecoder
    URL
    URLSearchParams
    WebAssembly
    queueMicrotask()
    setImmediate()
    setInterval()
    setTimeout()
    clearImmediate()
    clearTimeout()
    clearInterval()


}


function main() {
    // dataType()

    //

    //

    //

    //
    // exceptionCapture()

    //
    introduceModule()

    // global object
    globalObject()

    //
}
main()
