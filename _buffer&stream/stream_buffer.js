import {createReadStream, createWriteStream} from 'fs'
// 流
// 英文 Stream 是对输入输出设备的抽象，这里的设备可以是文件、网络、内存等。
// 流是有方向性的，当程序从某个数据源读入数据，会开启一个输入流，这里的数据源可以是文件或者网络等，例如我们从 a.txt 文件读入数据。相反的当我们的程序需要写出数据到指定数据源（文件、网络等）时，则开启一个输出流。当有一些大文件操作时，我们就需要 Stream 像管道一样，一点一点的将数据流出。

// const readable = createReadStream('./test111.txt');
// const writeable = createWriteStream('./test222.txt');
// readable.pipe(writeable);



// 如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理。
// 这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 RAM 中。

// 通过 Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe() 三种方式来创建

// Buffer.from()       不传递 encoding 默认按照 UTF-8 格式转换存储
const b1 = Buffer.from('10');
const b2 = Buffer.from('10', 'utf8');
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);
console.log(b1, b2, b3, b4); // <Buffer 31 30> <Buffer 31 30> <Buffer 0a> <Buffer 0a>


// Buffer.alloc
// 返回一个已初始化的 Buffer，可以保证新创建的 Buffer 永远不会包含旧数据。
const bAlloc1 = Buffer.alloc(10); // 创建一个大小为 10 个字节的缓冲区
console.log(bAlloc1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Buffer.allocUnsafe
// 创建一个大小为 size 字节的新的未初始化的 Buffer，由于 Buffer 是未初始化的，因此分配的内存片段可能包含敏感的旧数据。在 Buffer 内容可读情况下，则可能会泄露它的旧数据，这个是不安全的，使用时要谨慎。
const bAllocUnsafe1 = Buffer.allocUnsafe(10);
console.log(bAllocUnsafe1); // <Buffer 49 ae c9 cd 49 1d 00 00 11 4f>


// Buffer 字符编码
// 通过使用字符编码，可实现 Buffer 实例与 JavaScript 字符串之间的相互转换，目前所支持的字符编码如下所示：
//     'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
//     'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
//     'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
//     'ucs2' - 'utf16le' 的别名。
//     'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
//     'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
//     'binary' - 'latin1' 的别名。
//     'hex' - 将每个字节编码成两个十六进制的字符。
const buf1 = Buffer.from('hello world', 'ascii');
console.log(buf1.toString('hex')); // 68656c6c6f20776f726c64


// 字符串与 Buffer 类型互转
// 字符串转 Buffer
const buf2 = Buffer.from('Node.js 技术大牛', 'UTF-8');
console.log(buf2); // <Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88>
console.log(buf2.length); // 17
// Buffer 转换为字符串
const buf3 = Buffer.from('Node.js 技术大牛', 'UTF-8');
console.log(buf3); // <Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88>
console.log(buf3.length); // 17
console.log(buf3.toString('UTF-8', 0, 9)); // Node.js �  中文乱码
console.log(buf3.toString('UTF-8', 0, 11)); // Node.js 技


// Buffer内存分配原理
// Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。
// 使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域，slab 具有如下三种状态：
//     full：完全分配状态
//     partial：部分分配状态
//     empty：没有被分配状态

// Buffer 内存分配总结
// 这块内容着实难理解，翻了几本 Node.js 相关书籍，朴灵大佬的「深入浅出 Node.js」Buffer 一节还是讲解的挺详细的，推荐大家去阅读下。
//     在初次加载时就会初始化 1 个 8KB 的内存空间，buffer.js 源码有体现
//     根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象
//     小 Buffer 情况，会继续判断这个 slab 空间是否足够
//     如果空间足够就去使用剩余空间同时更新 slab 分配状态，偏移量会增加
//     如果空间不足，slab 空间不足，就会去创建一个新的 slab 空间用来分配
//     大 Buffer 情况，则会直接走 createUnsafeBuffer(size) 函数
//     不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，最终还是可以被 V8 的垃圾回收标记所回收。


// Buffer应用场景
// 1.  I/O 操作
// 关于 I/O 可以是文件或网络 I/O，以下为通过流的方式将 input.txt 的信息读取出来之后写入到 output.txt 文件
const inputStream = createReadStream('input.txt'); // 创建可读流
const outputStream = createWriteStream('output.txt'); // 创建可写流

inputStream.pipe(outputStream); // 管道读写
// 在 Stream 中我们是不需要手动去创建自己的缓冲区，在 Node.js 的流中将会自动创建。


// 2.  zlib.js
// zlib.js 为 Node.js 的核心库之一，其利用了缓冲区（Buffer）的功能来操作二进制数据流，提供了压缩或解压功能


// 3.  加解密
// 在一些加解密算法中会遇到使用 Buffer
// 例如 crypto.createCipheriv 的第二个参数 key 为 String 或 Buffer 类型，如果是 Buffer 类型，就用到了本篇我们讲解的内容
// 以下做了一个简单的加密示例，重点使用了 Buffer.alloc() 初始化一个实例（这个上面有介绍），之后使用了 fill 方法做了填充，这里重点在看下这个方法的使用。
// buf.fill(value[, offset[, end]][, encoding])
//     value: 第一个参数为要填充的内容
//     offset: 偏移量，填充的起始位置
//     end: 结束填充 buf 的偏移量
//     encoding: 编码集

// 以下为 Cipher 的对称加密 Demo
import {createCipheriv} from 'crypto'
const [key, iv, algorithm, encoding, cipherEncoding] = [
    'a123456789', '', 'aes-128-ecb', 'utf8', 'base64'
];

const handleKey = (key) => {
    const bytes = Buffer.alloc(16); // 初始化一个 Buffer 实例，每一项都用 00 填充
    console.log(bytes); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
    bytes.fill(key, 0, 10) // 填充
    console.log(bytes); // <Buffer 61 31 32 33 34 35 36 37 38 39 00 00 00 00 00 00>
    return bytes;
}

let cipher = createCipheriv(algorithm, handleKey(key), iv);
let _crypted = cipher.update('Node.js 技术大牛', encoding, cipherEncoding);
_crypted += cipher.final(cipherEncoding);
console.log(_crypted) // jE0ODwuKN6iaKFKqd3RF4xFZkOpasy8WfIDl8tRC5t0=



// Buffer VS Cache
// https://www.zhihu.com/question/26190832

// 缓冲（Buffer）
// 缓冲（Buffer）是用于处理二进制流数据，将数据缓冲起来，它是临时性的，对于流式数据，会采用缓冲区将数据临时存储起来，等缓冲到一定的大小之后在存入硬盘中。视频播放器就是一个经典的例子，有时你会看到一个缓冲的图标，这意味着此时这一组缓冲区并未填满，当数据到达填满缓冲区并且被处理之后，此时缓冲图标消失，你可以看到一些图像数据。

// 缓存（Cache）
// 缓存（Cache）我们可以看作是一个中间层，它可以是永久性的将热点数据进行缓存，使得访问速度更快，例如我们通过 Memory、Redis 等将数据从硬盘或其它第三方接口中请求过来进行缓存，目的就是将数据存于内存的缓存区中，这样对同一个资源进行访问，速度会更快，也是性能优化一个重要的点。



// Buffer VS String
// 通过压力测试来看看 String 和 Buffer 两者的性能如何？
import {createServer} from 'http'

let s = '';
for (let i=0; i<1024*10; i++) {
    s+='a'
}

const str = s;
const bufStr = Buffer.from(s);
const server = createServer((req, res) => {
    console.log('请求url---->  ', req.url);
    if (req.url === '/buffer') {
        res.end(bufStr);
    } else if (req.url === '/string') {
        res.end(str);
    }
});

server.listen(3000);

// TODO 使用 AB 测试工具
// 测试 string
// ab -c 200 -t 60 http://127.0.0.1:3000/string
// 结果重要的参数指标
//     Complete requests: 21815
//     Requests per second: 363.58 [#/sec] (mean)
//     Transfer rate: 3662.39 [Kbytes/sec] received

// 测试 buffer
// ab -c 200 -t 60 http://127.0.0.1:3000/buffer
// 结果重要的参数指标
//     Complete requests: 50000
//     Requests per second: 907.24 [#/sec] (mean)
//     Transfer rate: 9138.82 [Kbytes/sec] received
// 通过 buffer 传输总共的请求数为 50000、QPS 达到了两倍多的提高、每秒传输的字节为 9138.82 KB

// !!! 从这些数据上可以证明提前将数据转换为 Buffer 的方式，可以使性能得到近一倍的提升。
// 在 HTTP 传输中传输的是二进制数据，上面例子中的 /string 接口直接返回的字符串，这时候 HTTP 在传输之前会先将字符串转换为 Buffer 类型，以二进制数据传输，通过流（Stream）的方式一点点返回到客户端。但是直接返回 Buffer 类型，则少了每次的转换操作，对于性能也是有提升的。
// 在一些 Web 应用中，对于静态数据可以预先转为 Buffer 进行传输，可以有效减少 CPU 的重复使用（重复的字符串转 Buffer 操作）。

















