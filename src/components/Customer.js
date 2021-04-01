// import 특정한 라이브러리를 불러올 때 사용

// export 내보내기 (다른 파일에서 사용할 수 있도록)

import React from 'react';

class Customer extends React.Component { // 리엑트에 컴포넌트 형태로 작성이 된 클래스를 상속받아서 Customer 클래스 정의하기
    render() { // render()는 실제로 그려지는 내용 담는 곳, props를 이용해서 받은 값 이용하기 (this)
        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer; // Customer 클래스 내보내기