import * as child_process from 'child_process'
import { promisify } from 'util';

// spawn、exec、execFile、fork 四个函数   对应同步函数：spawnSync、execSync、execFileSync

const exec = promisify(child_process.exec);
const execFile = promisify(child_process.execFile);


// exec
// child_process.exec(command[, options][, callback])
const { stdout1, stderr1 } = await exec('python hello.py')
console.log('stdout1  ------>  ', stdout1);
console.log('stderr1  ------>  ', stderr1);


// execFile
// child_process.execFile(file[, args][, options][, callback])
const { stdout2, stderr2 } = await execFile('python', [' hello.py', 'params1', 'params2'], {stdio:'inherit'})
console.log('stdout2  ------>  ', stdout2);
console.log('stderr2  ------>  ', stderr2);

// exec、execFile只能通过捕获子进程的标准输出流、错误输出流获取子进程的返回



// fork
// child_process.fork(modulePath[, args][, options])
// 专门用于创建新的 js 子进程，不能是其他语言程序
// 无回调，参数要以第二个参数传入
// 返回的子进程将内置一个额外的ipc通信通道，允许消息在父进程和子进程之间来回传递。


 
child_process.spawn()


// 对于 exec 和 execFile 传递的是 command 或 可执行文件，类似 ls 或者 start.sh 或者 node;可接受回调; 二者不同的是命令的参数位置
// 对于 fork 传递的是node支持的脚本，类似 start.js，无回调
// 对于 spawn，它是以上三个方法实现的基础。



