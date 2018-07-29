import React, { Component } from 'react';
import 'bulma/css/bulma.css'

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
                <h1 className="title">Create an account</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input name="username" type={'text'} className="input username" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input name="password" type={'password'} className="input password" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <button className="button is-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}