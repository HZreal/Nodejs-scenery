/**
 * TODO 数据类型
 */
function dataType() {

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
    introduceModule()

    // global object
    globalObject()

    //
}

main()
