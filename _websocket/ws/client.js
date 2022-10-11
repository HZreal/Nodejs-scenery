// Sending and receiving text data
import WebSocket from 'ws';

const ws = new WebSocket('ws://www.host.com/path');


// Sending and receiving text data
function sendTextData() {
    ws.on('open', function open() {
        ws.send('something');
    });
    
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
}


// Sending binary data
function sendBinaryData() {
    ws.on('open', function open() {
        const array = new Float32Array(5);
      
        for (var i = 0; i < array.length; ++i) {
          array[i] = i / 2;
        }
      
        ws.send(array);
      });
}
