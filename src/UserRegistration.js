import React, { Component } from 'react';

export class UserRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) =>  {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        return (
            <div>
                <input name="username" type={'text'} className={'username'} onChange={this.handleInputChange}/>
                <input name="password" type={'password'} className={'password'} onChange={this.handleInputChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}