import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import axios from "axios"

import { AppBar } from "./components/AppBar"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      activeUserTodos: null
    };
  }
  componentDidMount() {
    this.fetchUserInfo();
  }

  // Right now, you're always me
  fetchUserInfo() {
    axios
          .get("http://localhost:8000/api/users/")
          .then(res => this.setState({
            activeUser: res.data[0],
            activeUserTodos: res.data[0]['todo_set']
          }))
          .catch(err => console.log(err));
  }
  renderTodos() {
    if(!this.state.activeUserTodos) return;
    let todoList = [];
    for(let todo of this.state.activeUserTodos) {
      todoList.push(
        <li key={todo.id}>
          {todo.title}
        </li>
      )
    }
    return todoList;
  }
  render() {
    console.log(this.state.activeUserTodos);
    let activeUserName = this.state.activeUser ? this.state.activeUser.username : "";
    return (
      <div className="App">
        <Button color="primary">Hello {activeUserName}</Button>
        <h2>Here are your daily todos:</h2>
        <ol>
          {this.renderTodos()}
        </ol>
      </div>
    );
  }
}

export default App;
