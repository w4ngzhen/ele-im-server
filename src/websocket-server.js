const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});
server.listen(8080);
let socket = io.listen(server);
socket.on('connect', conn => {
  console.log('接受到一次通讯：' + conn.id);
  conn.on('LoginCheckForWebSocket', data => {
    console.log('LoginCheckForWebSocket：' + JSON.stringify(data));
    conn.emit('LoginComplete');
  });
});

