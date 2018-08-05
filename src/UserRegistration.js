import React, { Component } from 'react';
import * as pwn from "./Pwnedpasswords.api";
import 'bulma/css/bulma.css'
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export class UserRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            passwordMatchesConfirm: true,
            passwordIsPwned: false
        };
    }

    submitEnabled = () => {
        return this.state.password && this.state.passwordMatchesConfirm;
    };

    checkForPwnedPassword = (password) => {
        pwn.isPasswordPwned(password)
            .then(result => this.setState({passwordIsPwned: result}));
    };

    handleInputChange = (event) =>  {
        const target = event.target;

        // Logic to check passwords match must check input change against existing field value.
        let passwordMatchesConfirm = this.state.passwordMatchesConfirm;
        if (target.name === 'password') {
            passwordMatchesConfirm = target.value && (target.value === this.state.confirm);
            this.checkForPwnedPassword(target.value);
        } else if (target.name === 'confirm') {
            passwordMatchesConfirm = target.value && (target.value === this.state.password);
        }

        this.setState({
            [target.name]: target.value,
            passwordMatchesConfirm: passwordMatchesConfirm
        });
    };

    handleSubmit = () => {
        if (this.submitEnabled()) {
            this.props.onSubmit(this.state.username, this.state.password);
        } else {
            console.error("Attempt to submit form when form has validation errors");
        }
    };

    render() {
        return (
            <div>
                <h1 className="title">Create an account</h1>
                <div className="field" id="usernameField">
                    <label className="label">Username</label>
                    <div className="control">
                        <input name="username" type="text" className="input" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="field" id="passwordField">
                    <label className="label">Password</label>
                    <div className="control has-icons-right">
                        <input name="password" type="password" className={'input' + (this.state.passwordIsPwned ? ' is-danger' : '')} onChange={this.handleInputChange}/>
                        {this.state.passwordIsPwned &&
                        <span className="icon is-right tooltip" style={{pointerEvents: 'inherit'}} data-tooltip="Password is pwned">
                                <FontAwesomeIcon icon={faExclamationCircle}/>
                            </span>
                        }
                    </div>
                </div>
                <div className="field" id="confirmField">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-right">
                        <input name="confirm" type="password" className={'input' + (this.state.passwordMatchesConfirm ? '' : ' is-danger')} onChange={this.handleInputChange}/>
                        {!this.state.passwordMatchesConfirm &&
                            <span className="icon is-right tooltip" style={{pointerEvents: 'inherit'}} data-tooltip="Confirmation does not match password">
                                <FontAwesomeIcon icon={faExclamationCircle}/>
                            </span>
                        }
                    </div>
                </div>
                <button className="button is-primary" onClick={this.handleSubmit} disabled={!this.submitEnabled()} >Submit</button>
            </div>
        );
    }
}