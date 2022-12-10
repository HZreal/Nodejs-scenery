// const http = require('http');
import * as http from 'http'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

// 给server绑定request事件
server.on('request', (req) => {
  console.log(req.url)
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
