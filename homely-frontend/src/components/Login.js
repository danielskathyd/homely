import React, { Component } from 'react';
import "./register.css"
import axios from "axios"
import { Route, Link } from "react-router-dom";

export class Login extends React.Component {
  state = {
    inputs: {
      username: '',
      password: ''
    },
    loginError: false
  }


  onSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/auth/login', this.state.inputs)
      .then(res => {
        let userToken = res.data.token;
        this.props.setToken(userToken);
      })
      .catch(err => {
        console.log(err);
        this.setState({loginError: true});
      });
  }

  onChange = e => {
    let myInputs = this.state.inputs;
    myInputs[e.target.name] = e.target.value;
    this.setState({ inputs: myInputs });
  }

  render() {
    if(this.props.activeUser) return null;
    let errorText = this.state.loginError ? "Error: invalid login!" : "";
    return(
        <div className="login-container">
          <p className="log-header">Sign in</p>
          <form onSubmit={this.onSubmit}>
              <label>Username</label><br></br>
              <input className="username login-input"size="50"
                type="text"
                name="username"
                placeholder="johnnyappleseed"
                onChange={this.onChange}
                value={this.state.inputs.username}
              ></input><br></br>
              <label>Password</label><br></br>
              <input className="password login-input" size="50"
                type="password"
                name="password"
                placeholder="••••••••••••"
                onChange={this.onChange}
                value={this.state.inputs.password}></input><br></br>
              <div className = "row">
                <button className="styled-button" type="submit">Connect</button>
                <div className="error body">{errorText}</div>
              </div>
              <br></br>
              <Link to="/register" className="register-button">
                <button className="styled-button">I don't have an account</button>
              </Link>
          </form>
        </div>
    );
  }
}
