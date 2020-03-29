import React, { Component } from 'react';
import "./register.css"
import axios from "axios"
import { Route } from "react-router-dom";

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/auth/login', this.state)
      .then(res => {
        let userToken = res.data.token;
        this.props.setToken(userToken);
      })
      .catch(err => console.log(err));
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if(this.props.activeUser) return null;;
    return(
        <div className="container">
            <p className="header">Sign in</p>
            <form onSubmit={this.onSubmit}>
                <label>Username</label><br></br>
                <input className="username"size="50"
                  type="text"
                  name="username"
                  placeholder="johnnyappleseed"
                  onChange={this.onChange}
                  value={this.state.username}
                ></input><br></br>
                <label>Password</label><br></br>
                <input className="password" size="50"
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  onChange={this.onChange}
                  value={this.state.password}></input><br></br>
                <p class="forgot-password">Forgot password?</p>
                <button class="styled-button" type="submit">Connect</button><br></br>
            </form>
            <button class="styled-button">I don't have an account</button>
        </div>
    );
  }
}
