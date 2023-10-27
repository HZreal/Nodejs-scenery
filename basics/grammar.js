/**
 * TODO 数据类型
 */
function dataType() {

}


/**
 * 模块引入
 */
const { add } = require('./myModule/public')

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
    console.log('__dirname  ---->  ', __dirname);
    console.log('__filename  ---->  ', __filename);
    console.log('console  ---->  ', console);
    console.log('global  ---->  ', global);
    console.log('exports  ---->  ', exports);
    console.log('module  ---->  ', module);
    console.log('process  ---->  ', process);
    console.log('TextEncoder  ---->  ', TextEncoder);
    console.log('TextDecoder  ---->  ', TextDecoder);
    console.log('URL  ---->  ', URL);
    console.log('URLSearchParams  ---->  ', URLSearchParams);
    console.log('WebAssembly  ---->  ', WebAssembly);
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
        password: 'changeme'
    }
    const { password, ...extra} = obj
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
