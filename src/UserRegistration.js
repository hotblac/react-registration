import React, { Component } from 'react';
import 'bulma/css/bulma.css'

export class UserRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            submitEnabled: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) =>  {
        const target = event.target;

        // Logic to check passwords match must check input change against existing field value.
        let submitEnabled = false;
        if (target.name === 'password') {
            submitEnabled = target.value && (target.value === this.state.confirm);
        } else if (target.name === 'confirm') {
            submitEnabled = target.value && (target.value === this.state.password);
        }

        this.setState({
            [target.name]: target.value,
            submitEnabled: submitEnabled
        });
    };

    handleSubmit = () => {
        if (this.state.submitEnabled) {
            this.props.onSubmit(this.state.username, this.state.password);
        } else {
            console.error("Attempt to submit form when form has validation errors");
        }
    };

    render() {
        return (
            <div>
                <h1 className="title">Create an account</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input name="username" type="text" className="input username" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input name="password" type="password" className="input password" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input name="confirm" type="password" className="input confirm" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <button className="button is-primary" onClick={this.handleSubmit} disabled={!this.state.submitEnabled}>Submit</button>
            </div>
        );
    }
}