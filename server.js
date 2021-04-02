const express = require('express');
const bodyParser = require('body-Parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '이재성',
            'birthday': '950328',
            'gender': '남자',
            'job': '개발자'
          },
          {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '김지영',
            'birthday': '920825',
            'gender': '여자',
            'job': '공무원'
          },
          {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이재영',
            'birthday': '920722',
            'gender': '남자',
            'job': '자영업자'
          }
    ])
})

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.listen(port, () => console.log(`Listening on port ${port}`));