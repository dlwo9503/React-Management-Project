// import 특정한 라이브러리를 불러올 때 사용
// export 내보내기 (다른 파일에서 사용할 수 있도록)

// jsx 문법에서 2개이상 사용시 반드시 div와 같은 태그들로 감싸줘야 함 (안하면 오류뜸)

// map함수를 이용해서 반복문을 사용 가능 (map 사용 시 key값을 이용해 구문가능하게 만들어 줘야 함)

// Material UI 사용해보기

import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component { // 리엑트에 컴포넌트 형태로 작성이 된 클래스를 상속받아서 Customer 클래스 정의하기
    render() { // render()는 실제로 그려지는 내용 담는 곳, props를 이용해서 받은 값 이용하기 (this)
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" /></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        )
    }
}

export default Customer; // Customer 클래스 내보내기