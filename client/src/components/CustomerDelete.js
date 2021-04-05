import React from 'react';
import CustomerAdd from './CustomerAdd';

class CustomerDelete extends React.Component {
    deleteCustomer(id) {
        const url = '/api/customers/' + id; // 이런식으로 하면 /api/customers/id넘버 를 삭제하겠다 라는식으로 명시
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;