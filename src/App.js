import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'; // export 한 Customer 불러오기

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

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;

