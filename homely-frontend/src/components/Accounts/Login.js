import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {
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
    const { username, password } = this.state;
    return (
      <div>
        <div>
          <h2>Login</h2>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div>
              <button type="submit">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
