// https://material-ui.com/components/tables/#table // 테이블 디자인 소스 참고

// props는 변경될 수 없는 데이터를 처리하고자 할 때 주로 사용
// state는 변경될 수 있는 데이터를 처리하고자 할 때 주로 사용

import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'; // export 한 Customer 불러오기
import CustomerAdd from './components/CustomerAdd'; // export 한 Customer 불러오기
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'; // 컴포넌트의 외부를 감싸기 위함
import { Component } from 'react';
import CirculerProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({ // 머테리얼 유아이에다 css 같이 사용
  root: { // root class css
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res })) // 받아온 데이터를 customers에 저장
      .catch(err => console.log(err)); // 에러 처리
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 타이머를 이용해서 0.02초마다 progress함수가 수행될 수 있도록 처리
    this.callApi()
      .then(res => this.setState({ customers: res })) // 받아온 데이터를 customers에 저장
      .catch(err => console.log(err)); // 에러 처리
  }

  callApi = async () => { // 비동기적으로 어떠한 내용을 수행하기 위함
    const response = await fetch('/api/customers'); // 접속하고자 하는 api의 주소를 넣음
    const body = await response.json(); // 고객의 목록이 json 형태로 출력이 되는데 그것을 body라는 변수에 넣어줌
    return body; // body를 반환
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); // completed가 100이 되는 순간 0으로 줄어들고 아닐시 +1
  }

  render() {
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => { // customers에 데이터가 있다면? true : false
                return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
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
      </div>
    );
  }
}

export default withStyles(styles)(App); // styles, app 를 함께 외부에서 사용할 수 있도록 export 해줌