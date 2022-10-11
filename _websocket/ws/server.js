import { WebSocketServer } from 'ws';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { parse } from 'url';


// doc: https://github.com/websockets/ws

function simpleServer() {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
    });
}



function httpsServer() {
    const server = createServer({
        cert: readFileSync('/path/to/cert.pem'),
        key: readFileSync('/path/to/key.pem')
      });
      const wss = new WebSocketServer({ server });
      
      wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
          console.log('received: %s', data);
        });
      
        ws.send('something');
      });
      
      server.listen(8080);
      
}

function multiServer() {


const server = createServer();
const wss1 = new WebSocketServer({ noServer: true });
const wss2 = new WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws) {
  // ...
});

wss2.on('connection', function connection(ws) {
  // ...
});

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);
}