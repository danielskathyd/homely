import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, first_name, last_name, password, password2 } = this.state;
    return (
      <div>
        <div>
          <h2>Register</h2>
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
            <div >
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div >
              <label>First Name</label>
              <input
                type="first_name"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div >
              <label>Last Name</label>
              <input
                type="last_name"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
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
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div>
              <button type="submit">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
