// https://material-ui.com/components/tables/#table // 테이블 디자인 소스 참고

// props는 변경될 수 없는 데이터를 처리하고자 할 때 주로 사용
// state는 변경될 수 있는 데이터를 처리하고자 할 때 주로 사용

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



class App extends Component {

  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err)); // 에러 처리
  }

  callApi = async() => { // 비동기적으로 어떠한 내용을 수행하기 위함
    const response = await fetch('/api/customers'); // 접속하고자 하는 api의 주소를 넣음
    const body = await response.json(); // 고객의 목록이 json 형태로 출력이 되는데 그것을 body라는 변수에 넣어줌
    return body; // body를 반환
  }

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
            {this.state.customers ? this.state.customers.map(c => {
              return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
            }) : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);