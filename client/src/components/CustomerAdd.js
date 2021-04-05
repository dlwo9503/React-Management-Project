import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // 바이트 형태의 파일
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 이미지의 이름
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null, // 바이트 형태의 파일
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 이미지의 이름
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() { // 헨들폼 함수가 수행되도록
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="txet" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="txet" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="txet" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="txet" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd; // 외부에서 사용될 수 있도록 export 해줌