import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Todo from "./components/Todo";
import SplitButton from "./components/SplitButton";
import Feed from "./components/Feed";
import { Register } from "./components/Accounts/Register";
import { Login } from "./components/Accounts/Login";
import { LoginButton } from "./components/LoginButton";

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
      .then(res =>
        this.setState({
          activeUser: res.data[0],
          activeUserTodos: res.data[0]["todo_set"]
        })
      )
      .catch(err => console.log(err));
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
    console.log(this.state.activeUserTodos);
    let activeUserName = this.state.activeUser
      ? this.state.activeUser.username
      : "";
    return (
      <Container>
        <Router>
          <Switch>
            <Route expact path="/register" component={Register} />
            <Route expact path="/login" component={Login} />
          </Switch>
          <LoginButton />
        </Router>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header>homely</Header>
          </Grid>
          <Grid item xs={8}>
            <SplitButton></SplitButton>
            <Feed></Feed>
          </Grid>
          <Grid item xs={4}>
            <Todo></Todo>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
