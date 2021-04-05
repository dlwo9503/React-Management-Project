const fs = require('fs'); // 파일에 접근 가능하게하는 라이브러리
const express = require('express'); // express 모듈 불러오기
const bodyParser = require('body-Parser'); // body-Parser 불러오기
const app = express(); // express 사용
const port = process.env.Port || 5000; // port 정의 - 5000

app.use(bodyParser.json()); // json의 형태로 사용하겠다
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json'); // 파일 접근
const conf = JSON.parse(data); // JSON 형식으로 data를 변환해주고
const mysql = require('mysql'); // mysql 라이브러리 불러오기

const connection = mysql.createConnection({ // conf에 저장되어있는 JSON 형식 데이터 연결
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer'); // 이미지 업로드하는데 사용되는 모듈
const upload = multer({dest: './upload'})
const sharp = require('sharp'); // 이미지 리사이징 하기 위한 라이브러리

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM opentutorials.CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));