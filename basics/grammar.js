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

/**
 * 通过 ... 符号排出一个对象中的某些属性
 */
function excludeFieldFromObject(){
    const obj = {
            userId: 1,
            username: 'john',
            password: 'changeme',
    }
    const {password, ...extra} = obj
    console.log('extra  ---->  ', extra);
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
    excludeFieldFromObject()
}

main()
