import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Todo } from "./components/Todo";
import SplitButton from "./components/SplitButton";
import Feed from "./components/Feed";
// import { Register } from "./components/Accounts/Register";
// import { Login } from "./components/Accounts/Login";
import { LoginButton } from "./components/LoginButton";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import MyList from "./components/MyList";
import Logo from "./images/logo.png"

const Container = styled("div")`
  margin: auto;
  justify-content: center;
  text-align: center;
`;

const Header = styled("div")`
  padding: 20px;
  text-align: left;
  background: #3b55de;
  color: #f5e5e5;
  font-family: "Quando", serif;
`;

const FeedColor = styled("div")`
  background: #f2c0d8;
`;

const Sticky = styled("div")`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserToken: null,
      activeUser: null,
      activeUserTodos: []
    };
    this.setToken = this.setToken.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.generateTodoList = this.generateTodoList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  fetchUserInfo() {
    console.log(
      "Attemping to fetch user info using: ",
      `Token ${this.state.activeUserToken}`
    );
    axios
      .get("http://localhost:8000/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.state.activeUserToken}`
        }
      })
      .then(res => {
        this.setState({
          activeUser: res.data,
          activeUserTodos: res.data.todo_set
        });
      })
      .catch(err => console.log(err));
  }
  setToken(userToken) {
    this.setState({ activeUserToken: userToken });
    this.fetchUserInfo();
  }
  handleLogout() {
    if (!this.state.activeUserToken) return;
    console.log(
      "Attemping to log out user using: ",
      `Token ${this.state.activeUserToken}`
    );
    axios
      .post("http://localhost:8000/api/auth/logout", null, {
        headers: {
          Authorization: `Token ${this.state.activeUserToken}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          activeUserToken: null,
          activeUser: null,
          activeUserTodos: []
        });
      })
      .catch(err => console.log(err));
  }

  generateTodoList() {
    if (!this.state.activeUserTodos) return;
    let myData = [];
    for (let todo of this.state.activeUserTodos) {
      myData.push({
        name: todo.title
        // completed: todo.completed,
      });
    }
    return myData;
  }

  addTodo(newData) {
    let newTodo = {
      title: newData,
      completed: false,
      owner: this.state.activeUser ? this.state.activeUser.id : -1
    };

    // If user isn't logged in
    if (!this.state.activeUser) {
      let myTodos = this.state.activeUserTodos;
      myTodos.push(newTodo);
      this.setState({ activeUserTodos: myTodos });
      console.log("User isnt logged in");
      return true;
    }

    console.log("You're logged in");
    axios
      .post("http://localhost:8000/api/todos/", newTodo)
      .then(res => {
        let myTodos = this.state.activeUserTodos;
        myTodos.push(newTodo);
        this.setState({ activeUserTodos: myTodos });
        console.log(myTodos);
        return true;
      })
      .catch(err => console.log(err));
    return false;
  }

  renderTodos() {
    if (!this.state.activeUserTodos) return;
    let todoList = [];
    for (let todo of this.state.activeUserTodos) {
      todoList.push(<li key={todo.id}>{todo.title}</li>);
    }
    return todoList;
  }
  render() {
    console.log(this.state.activeUser);
    let activeUserName = this.state.activeUser
      ? this.state.activeUser.username
      : "";
    let logButton = this.state.activeUser ? (
      <Link to="/">
        <button className="log-button" onClick={this.handleLogout}>
          Logout
        </button>
      </Link>
    ) : (
      <Link to="/login">
        <button className="log-button">Login</button>
      </Link>
    );
    let userGreeting = this.state.activeUser
      ? "welcome " + activeUserName + "!"
      : "";
    return (
      <Container>
        <Router>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header><Link to="/" style={{ textDecoration: 'none' }}>
                <div className="logo-text">homely
                <img src={Logo} className="logo"/></div>
                {logButton}
                <div className="user-greeting">{userGreeting}</div>
              </Link></Header>
            </Grid>
            <Grid item xs={8}>
              <FeedColor>
                <SplitButton></SplitButton>
                <Feed></Feed>
              </FeedColor>
            </Grid>
            <Grid item xs={4}>
              {/* <Sticky>
                <Todo
                  todo_set={this.state.activeUserTodos}
                  addTodo={this.addTodo}></Todo>
              </Sticky> */}
              <Switch>
                <Route
                  expact
                  path="/register"
                  render={props => (
                    <Register
                      {...props}
                      setToken={this.setToken}
                      activeUser={this.state.activeUser}
                    />
                  )}
                />
                <Route
                  expact
                  path="/login"
                  render={props => (
                    <Login
                      {...props}
                      setToken={this.setToken}
                      activeUser={this.state.activeUser}
                    />
                  )}
                />
              </Switch>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <FeedColor>
              <SplitButton></SplitButton>
              <Feed></Feed>
            </FeedColor>
          </Grid>
          <Grid item xs={4}>
            {/* <Sticky>
              <Todo
                todo_set={this.state.activeUserTodos}
                addTodo={this.addTodo}></Todo>
            </Sticky> */}
            {/* <Login></Login> */}
            <MyList></MyList>
          </Grid>
        </Router>
      </Container>
    );
  }
}

export default App;
