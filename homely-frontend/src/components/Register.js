import React, { Component } from 'react';
import "./register.css";
import axios from 'axios';
import { Link } from "react-router-dom";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
      },
      passwordError: false,
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(e.target.getElementsByClassName('password-match-error')[0]);
    if(this.state.inputs.password !== this.state.inputs.password2) {
      this.setState({ passwordError: true });
      return;
    }
    axios
      .post('http://localhost:8000/api/auth/register', this.state.inputs)
      .then(res => {
        let userToken = res.data.token;
        this.setState({ hidden: true });
        this.props.setToken(userToken);
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    let myInputs = this.state.inputs;
    myInputs[e.target.name] = e.target.value;
    this.setState({ inputs: myInputs });
  }

  render() {
    if(this.props.activeUser) return null;
    return(
        <div className="login-container">
            <p className="header">Create an account</p>
            <p className="body">We know staying at home can be hard.
               That’s why we want to help you stay productive
               and share your successes with those around you. </p>
            <p className="body">Create an account to connect with others and
               exchange ideas on how we can tackle self isolation together.</p>
            <form onSubmit={this.onSubmit}>
                <label>Email</label><br></br>
                <input size="50" type="email" name="email" className="login-input"
                  placeholder="johnnyappleseed@gmail.com"
                  onChange={this.onChange} value={this.state.inputs.email}></input><br></br>
                <label>Username</label><br></br>
                <input size="50" type="text" name="username" className="login-input"
                  placeholder="johnnyappleseed"
                  onChange={this.onChange} value={this.state.inputs.username}></input><br></br>
                <label>Password</label><br></br>
                <input size="50" type="password" name="password" className="login-input"
                  placeholder="••••••••••••"
                  onChange={this.onChange} value={this.state.inputs.password}></input><br></br>
                <div className="row">
                  <label>Verify Password</label>
                  <label className="password-match-error" style={{
                    'visibility': (this.state.passwordError ? 'visible' : 'hidden')
                  }}>Your passwords do not match!</label>
                </div><br></br>
                <input size="50" type="password" name="password2" className="login-input"
                  placeholder="••••••••••••"
                  onChange={this.onChange} value={this.state.inputs.password2}></input><br></br>
                <button class="styled-button">Connect</button>
            </form>
        </div>
    );
  }
}
