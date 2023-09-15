// 进程
// 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础，进程是线程的容器
// 启动一个服务、运行一个实例，就是开一个服务进程
// 多进程就是进程的复制（fork），fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享。
import {createServer} from "http";
// demo
// createServer().listen(3000, () => {
//     process.title = '测试进程 server '  // 对进程进行命名
//     console.log(`process.pid: `, process.pid);
//     console.log(`process.title: `, process.title);
// });

// 进程关注进程间通信问题


// 线程
// 线程是操作系统能够进行运算调度的最小单位，首先我们要清楚线程是隶属于进程的，被包含于进程之中。一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的。
// 同一块代码，可以根据系统CPU核心数启动多个进程，每个进程都有属于自己的独立运行空间，进程之间是不相互影响的。
// 同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，文件描述符和信号处理等。但同一进程中的多个线程有各自的调用栈（call stack），自己的寄存器环境（register context），自己的线程本地存储（thread-local storage)，线程又有单线程和多线程之分

// 单线程: 就是一个进程只开一个线程。Javascript 就是属于单线程，程序顺序执行，可以想象一下队列，前面一个执行完之后，后面才可以执行，当你在使用单线程语言编码时切勿有过多耗时的同步操作，否则线程会造成阻塞，导致后续响应无法处理。你如果采用 Javascript 进行编码时候，请尽可能的使用异步操作。
// 一个计算耗时造成线程阻塞的例子
const computation = () => {
    let sum = 0;
    console.info('计算开始');
    console.time('计算耗时');

    for (let i = 0; i < 1e10; i++) {
        sum += i
    }

    console.info('计算结束');
    console.timeEnd('计算耗时');
    return sum;
};

const server = createServer((req, res) => {
    if (req.url === '/compute') {
        const sum = computation();
        res.end(`Sum is ${sum}`);
    }
    res.end(`ok`);
});

const [url, port] = ['127.0.0.1', 3000];
// server.listen(port, url, () => {
//     console.log(`server started at http://${url}:${port}`);
// });

// 单线程使用总结
//     Node.js 虽然是单线程模型，但是其基于事件驱动、异步非阻塞模式，可以应用于高并发场景，避免了线程创建、线程之间上下文切换所产生的资源开销。
//     如果你有需要大量计算，CPU 耗时的操作，开发时候要注意。


// 多线程
// 多线程就是一个进程开多个线程。Java / Go 就是多线程编程语言的一种，可以有效避免代码阻塞导致的后续请求无法处理。

// 多线程使用总结
// 多线程的代价还在于创建新的线程和执行期上下文线程的切换开销，由于每创建一个线程就会占用一定的内存，当应用程序并发大了之后，内存将会很快耗尽。类似于上面单线程模型中例举的例子，需要一定的计算会造成当前线程阻塞的，还是推荐使用多线程来处理

// 线程间资源是共享的，关注的是安全问题


// Nodejs的线程与进程
// Node.js 基于事件驱动、非阻塞I/O模型，充分利用操作系统提供的异步 I/O 进行多任务的执行，适合于 I/O 密集型的应用场景
// 因为异步，程序无需阻塞等待结果返回，而是基于回调通知的机制，原本同步模式等待的时间，则可以用来处理其它任务，
// 在 Web 服务器方面，著名的 Nginx 也是采用此模式（事件驱动），Nginx 采用 C 语言进行编写，主要用来做高性能的 Web 服务器，不适合做业务。Web业务开发中，如果你有高并发应用场景那么 Node.js / Golang 会是你不错的选择。
// ps: 密集型计算，那肯定是Go更优，如果是密集型IO，看程序员。。。

// 在单核 CPU 系统之上，采用 单进程 + 单线程 的模式来开发。
// 在多核 CPU 系统之上，可以用 child_process.fork 开启多个进程（v0.8版本之后新增了Cluster 来实现多进程架构） ，即 多进程 + 单线程 模式。注意：开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。

// Process
// Node.js 中的进程 Process 是一个全局对象，无需 require 直接使用，给我们提供了当前进程中的相关信息。
// doc: http://nodejs.cn/api/process.html
//     process.env：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息
//     process.nextTick：这个在谈及 Event Loop 时经常为会提到
//     process.pid：获取当前进程id
//     process.ppid：当前进程对应的父进程
//     process.cwd()：获取当前进程工作目录
//     process.platform：获取当前进程运行的操作系统平台
//     process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
//     进程事件：process.on('uncaughtException', cb) 捕获异常信息、process.on('exit', cb）进程退出监听
//     三个标准流：process.stdout 标准输出、process.stdin 标准输入、process.stderr 标准错误输出


// Nodejs进程创建
// 提供了 child_process 内置模块，用于创建子进程
// doc: http://nodejs.cn/api/child_process.html#child_process_child_process

// 四种方式
//     child_process.spawn()：适用于返回大量数据，例如图像处理，二进制数据处理。
//     child_process.exec()：适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。
//     child_process.execFile()：类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
//     child_process.fork()： 衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，通长根据系统 CPU 核心数设置。
import {spawn, exec, execFile, fork} from 'child_process'

// 方式一：spawn
// child_process.spawn(command[, args][, options])

// 创建父子进程间通信的三种方式：
//     让子进程的stdio和当前进程的stdio之间建立管道链接 child.stdout.pipe(process.stdout);
//     父进程子进程之间共用stdio
//     事件监听
const child = spawn('node', ['-v']) // cwd 指定子进程的工作目录，默认当前目录
child.stdout.pipe(process.stdout);
console.log(process.pid, child.pid);      // 主进程id3243 子进程3244

// 方式二：exec
exec(`node -v`, (error, stdout, stderr) => {
    console.log({error, stdout, stderr})
})

// 方式三：execFile
execFile(`node`, ['-v'], (error, stdout, stderr) => {
    console.log({error, stdout, stderr})
})

// 方式四：fork
fork('./worker.js'); // fork 一个新的子进程

// fork子进程充分利用CPU资源
// 上文单线程一节 例子中，当 CPU 计算密度大的情况程序会造成阻塞导致后续请求需要等待，下面采用 child_process.fork 方法，在进行 cpmpute 计算时创建子进程，子进程计算完成通过 send 方法将结果发送给主进程，主进程通过 message 监听到信息后处理并退出。
// fork_app.js
const server2 = createServer((req, res) => {
    if (req.url === '/compute') {
        const compute = fork('./fork_compute.js');
        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        })
    } else {
        res.end(`ok`);
    }
});

// server2.listen(3000, '127.0.0.1', () => {
//     console.log(`server started at http://127.0.0.1:${3000}`);
// });

// 针对 上文单线程一节 的例子需要进行计算的部分拆分出来单独进行运算。
// fork_compute.js
// 上述computation函数
// const computation = () => { ... }

// process.on('message', msg => {
//     console.log(msg, 'process.pid', process.pid); // 子进程id
//     const sum = computation();
//
//     // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
//     process.send(sum);
// })



// 多进程架构模型
// 多进程架构解决了单进程、单线程无法充分利用系统多核 CPU 的问题，启动一批 Node.js 进程来提供服务
// 主进程主要处理以下逻辑：
//     创建一个 server 并监听 3000 端口。
//     根据系统 cpus 开启多个子进程
//     通过子进程对象的 send 方法发送消息到子进程进行通信
//     在主进程中监听了子进程的变化，如果是自杀信号重新启动一个工作进程。
//     主进程在监听到退出消息的时候，先退出子进程在退出主进程
// master.js
import {cpus} from 'os'
import {createServer as netCreateServer} from 'net'

const netServer = netCreateServer()
netServer.listen(3000);
process.title = 'node-master'

const workers = {};
const createWorker = () => {
    const worker = fork('worker.js')
    worker.on('message', (message) => {
        if (message.act === 'suicide') {
            createWorker();
        }
    })
    worker.on('exit', function(code, signal) {
        console.log('worker process exited, code: %s signal: %s', code, signal);
        delete workers[worker.pid];
    });
    worker.send('server', netServer);
    workers[worker.pid] = worker;
    console.log('worker process created, pid: %s ppid: %s', worker.pid, process.pid);
}

for (let i=0; i<cpus.length; i++) {
    createWorker();
}

process.once('SIGINT', close.bind(this, 'SIGINT')); // kill(2) Ctrl-C
process.once('SIGQUIT', close.bind(this, 'SIGQUIT')); // kill(3) Ctrl-\
process.once('SIGTERM', close.bind(this, 'SIGTERM')); // kill(15) default
process.once('exit', close.bind(this));

function close (code) {
    console.log('进程退出！', code);

    if (code !== 0) {
        for (let pid in workers) {
            console.log('master process exited, kill worker pid: ', pid);
            workers[pid].kill('SIGINT');
        }
    }

    process.exit(0);
}





































































