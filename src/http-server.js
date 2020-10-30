const express = require('express');
const app = express();
let cors = require('cors');
const port = 9090;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login/check', (req, res) => {
  res.send({username: 'hello', name: '你好HELLO', token: '123456'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
