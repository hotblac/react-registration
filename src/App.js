import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {UserRegistration} from "./UserRegistration";

class App extends Component {

    handleUserRegistration = (username, password) => {
        alert('New user registered: ' + username);
    };

    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                </div>
                <div className="columns">
                    <div className="column box is-one-third is-offset-one-third">
                        <UserRegistration onSubmit={this.handleUserRegistration}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
