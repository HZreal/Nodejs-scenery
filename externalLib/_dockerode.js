/**
 * @author sizhong
 * @date 2023-08-21
 */
// import * as Docker from 'dockerode';
const Docker = require('dockerode')


// 连接 windows 本机的 docker Desktop
// const dockerConn = new Docker();

// 连接 linux 本机的 docker   注意：需要提高docker.sock的权限，chmod 777 /var/run/docker.sock
// const dockerConn = new Docker({ socketPath: '/var/run/docker.sock' });

const dockerConn = new Docker({host: 'http://218.94.41.26', port: 40088});

const container = dockerConn.getContainer('4d47c1a11c8a');
container.inspect( (err, data) =>{
    console.log(data);
});

// // 创建一个容器
// const container = await dockerConn.createContainer({
//     "Cmd": ["python", "main.py", "{a:1, b:2}"],
//     "Tty": true,
//     "Image": "b2.base.sub01m08a00_v1:v1",
//     "Volumes": {"/app/data": {}},
//     "HostConfig": {"Binds": ["C:/sjcl_data/:/app/data/"], "AutoRemove": true}
// });
//
// // 启动容器
// await container.start();
//
//
// // 创建捕获标准输出的可读流
// const logsStream = await container.logs({
//     follow: true,
//     stdout: true,
//     stderr: true,
// });
//
// // 获取容器标准输出
// logsStream.on('data', async chunk => {
//     console.log('chunk  ---->  ', chunk);
// })
//
// // 获取容器标准错误输出
// logsStream.on('error', async err => {
//     console.log('err  ---->  ', err);
// })
//
// // 标志 流读取完成
// logsStream.on('end', async () => {
//     console.log('logsStream End ================');
// });
//
// // 标志 流读取通道关闭
// logsStream.on('close', async () => {
//     console.log('logsStream Close ================');
// });
//
// // 监听容器的退出状态
// container.wait(async (err, data) => {
//     console.log('err, data  ---->  ', err, data);
// })
