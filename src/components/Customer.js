// import 특정한 라이브러리를 불러올 때 사용

// export 내보내기 (다른 파일에서 사용할 수 있도록)

// jsx 문법에서 2개이상 사용시 반드시 div와 같은 태그들로 감싸줘야 함 (안하면 오류뜸)

// map함수를 이용해서 반복문을 사용 가능 (map 사용 시 key값을 이용해 구문가능하게 만들어 줘야 함)

import React from 'react';

class Customer extends React.Component { // 리엑트에 컴포넌트 형태로 작성이 된 클래스를 상속받아서 Customer 클래스 정의하기
    render() { // render()는 실제로 그려지는 내용 담는 곳, props를 이용해서 받은 값 이용하기 (this)
        return (
            <div>
                <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            </div>
        )
    }
}

class CustomerProfile extends React.Component { // alt은 알려주는거
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer; // Customer 클래스 내보내기