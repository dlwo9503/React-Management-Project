import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'; // export 한 Customer 불러오기

const customer = {
  'name': '이재성',
  'birthday': '950328',
  'gender': '남자',
  'job': '개발자'
}

function App() {
  return (
    <Customer // 컴포넌트 사용
      name={customer.name}
      birthday={customer.birthday}
      gender={customer.gender}
      job={customer.job}
    />
  );
}

export default App;

