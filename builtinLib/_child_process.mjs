import * as child_process from 'child_process'
// https://nodejs.org/api/child_process.html
import { promisify } from 'util';

// spawn、exec、execFile、fork 四个函数
// 对应同步函数：spawnSync、execSync、execFileSync，其中 fork 没有对应的 forkSync

// exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现




// 1. exec
// child_process.exec(command[, options][, callback])
// exec() 内部调用 execFile() 来实现。默认会创建shell并在其中执行命令。通常用于windows，原因是 On Windows，.bat and .cmd files are not executable on their own without a terminal, and therefore cannot be launched using child_process.execFile()
// const execChildProcess = child_process.exec('../external/LKH-3.exe ../external/LKH3_paramsFile.par', (err, stdout, stderr) => { 
//     if(err) {
//         console.error('err: ' + err);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr)
// })
// execChildProcess.on('data', (data) => { })

// 回调转成promise
// const execPromise = promisify(child_process.exec);
// const { stdout1, stderr1 } = await execPromise('python hello.py')
// console.log('stdout1  ------>  ', stdout1);
// console.log('stderr1  ------>  ', stderr1);


// 2. execFile
// child_process.execFile(file[, args][, options][, callback])
// execFile() 内部调用 spawn() 来实现。默认不开启shell。较于exec会更高效，
// const execFileChildProcess = child_process.execFile('python hello.py', (err, stdout, stderr) => { 
//     if(err) {
//         console.error('err: ' + err);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr)
// })
// execFileChildProcess.on('data', (data) => { })

// 回调转成promise
// const execFilePromise = promisify(child_process.execFile);
// const { stdout2, stderr2 } = await execFilePromise('python', [' hello.py', 'params1', 'params2'], {stdio:'inherit'})
// console.log('stdout2  ------>  ', stdout2);
// console.log('stderr2  ------>  ', stderr2);

// exec、execFile只能通过捕获子进程的标准输出流、错误输出流获取子进程的返回



// 3. fork
// child_process.fork(modulePath[, args][, options])
// const forkChildProcess = child_process.fork('index.js', [''], {})
// forkChildProcess.stdout.on('data', (data) =>{});
// 专门用于创建新的 nodejs 子进程，不能是其他语言程序
// 无回调，参数要以第二个参数传入
// 返回的子进程将内置一个额外的ipc通信通道，允许消息在父进程和子进程之间来回传递。


 // 4. spawn
// spawn方法是上面方法实现的继基础
console.log('start  ------>  ');
const spawnChildProcess = child_process.spawn('python', ['hello.py'], { stdio: ['pipe', 'pipe', 'pipe'] })
// 获取标准输出流
spawnChildProcess.stdout.on('data', (data) => {
    console.log('标准输出 ---->  ', data.toString('utf8'));
})
 //
spawnChildProcess.stderr.on('data', data => {
    console.log('标准错误输出 ---->  ', data.toString('utf8'));
});
 // 子进程退出事件
spawnChildProcess.on('exit', (code, signal) => {
    console.log('子进程已退出，code：' + code + ', signal: ', signal);
});

// 子进程输出流关闭事件
spawnChildProcess.on('close', (code, signal) => {
    console.log('子进程输出流关闭，code：' + code + ', signal: ',signal);
});

//
// const spawnPromise = promisify(child_process.spawn);
// async function aaa() {
//     await spawnPromise();
// }



// 对于 exec 和 execFile 传递的是 command 或 可执行文件，类似 ls 或者 start.sh 或者 node;可接受回调; 二者不同的是命令的参数位置
// 对于 fork 传递的是node支持的脚本，类似 start.js，无回调
// 对于 spawn，它是以上三个方法实现的基础。


// close永远在 exit和 error之后触发。但是并不意味着发生了 exit或 error事件就必然有 close事件

while (true) {

}

