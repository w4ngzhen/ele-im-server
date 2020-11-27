const db = require('./db');
const express = require('express');
const base64 = require('js-base64');
const app = express();
let cors = require('cors');
const port = 9090;

app.use(cors());

app.use(express.static('public'));

app.get('/public/images/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login/check', (req, res) => {
  let reqs = req;
  let userId = '123';
  let user = {
    userId: userId,
    name: 'zhen',
    token: base64.encode(userId)
  };
  res.send({
    code: 0,
    message: undefined,
    data: user
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
