const fs = require('fs'); // 파일에 접근 가능하게하는 라이브러리
const express = require('express'); // express 불러오기
const bodyParser = require('body-Parser'); // body-Parser 불러오기
const app = express(); // express 사용
const port = process.env.Port || 5000; // port 정의 - 5000

app.use(bodyParser.json()); // json의 형태로 사용하겠다
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM opentutorials.CUSTOMER",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.listen(port, () => console.log(`Listening on port ${port}`));