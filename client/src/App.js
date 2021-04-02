// https://material-ui.com/components/tables/#table // 테이블 디자인 소스 참고

import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'; // export 한 Customer 불러오기
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'; // 컴포넌트의 외부를 감싸기 위함
import { Component } from 'react';

const styles = theme => ({ // 머테리얼 유아이에다 css 같이 사용
  root: { // root class css
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto" // x축으로 오버플로우가 발생할 수 있도록 처리하는거임
  },
  table: { // table class css
    minWidth: 1080 // 테이블은 적어도 1080px만큼 자리를 차지하도록 함
  }
})

const customers = [
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
]

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />) })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);