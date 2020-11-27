const server = require('http').createServer();
const base64 = require('js-base64');
const _ = require('lodash');

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
let connections = {};
socket.on('connect', conn => {
  console.log('接受到一次通讯：' + conn.id);
  conn.on('LoginCheckForWebSocket', loginUser => {
    console.log('LoginCheckForWebSocket：' + JSON.stringify(loginUser));
    let userId = _.get(loginUser, 'userId', '');
    let token = _.get(loginUser, 'token', '');
    let res;
    if (_.isEmpty(userId)) {
      res = {code: 99, message: 'userId为空'};
    } else if (_.isEmpty(token)) {
      res = {code: 99, message: 'token为空'};
    } else if (!_.isEqual(base64.encode(userId), token)) {
      res = {code: 99, message: 'token校验失败'};
    } else {
      res = {code: 0};
    }
    conn.emit('LoginComplete', res);
    connections[userId] = conn;
  });
});

function tokenCheck(userId, token) {
  return true;
}
