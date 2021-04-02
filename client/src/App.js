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
import CirculerProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({ // 머테리얼 유아이에다 css 같이 사용
  root: { // root class css
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto" // x축으로 오버플로우가 발생할 수 있도록 처리하는거임
  },
  table: { // table class css
    minWidth: 1080 // 테이블은 적어도 1080px만큼 자리를 차지하도록 함, 이보다 작다면 가로 스크롤바가 나타남
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

/*
<리엑트 라이브러리가 처음 컴포넌트를 실행하는 과정>
1. constructor() // 불러오고
2. componentWillMount() // 불러오고
3. render() // 화면에 보여주고
4. componentDidMount() 불러온다

props or state => shouldComponentUpdate() // 갱신될 경우 다시 불러옴
리엑트는 화면의 변화를 스스로 감지해서 사용자에게 보여줌
*/

class App extends Component {

  state = {
    customers: "",
    completed: 0 // 0 ~ 100, 게이지를 나타내기 위함
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 타이머를 이용해서 0.02초마다 progress함수가 수행될 수 있도록 처리
    this.callApi()
      .then(res => this.setState({customers: res})) // 받아온 데이터를 customers에 저장
      .catch(err => console.log(err)); // 에러 처리
  }

  callApi = async() => { // 비동기적으로 어떠한 내용을 수행하기 위함
    const response = await fetch('/api/customers'); // 접속하고자 하는 api의 주소를 넣음
    const body = await response.json(); // 고객의 목록이 json 형태로 출력이 되는데 그것을 body라는 변수에 넣어줌
    return body; // body를 반환
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1}); // completed가 100이 되는 순간 0으로 줄어들고 아닐시 +1
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
            {this.state.customers ? this.state.customers.map(c => { // customers에 데이터가 있다면? true : false
              return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
            }) :
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CirculerProgress className={classes.progress} variant="indeterminate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App); // styles, app 를 함께 외부에서 사용할 수 있도록 export 해줌