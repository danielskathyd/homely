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
// import { Register } from "./components/Accounts/Register";
import { Login } from "./components/Accounts/Login";
import { LoginButton } from "./components/LoginButton";
import Register from "./components/Register";

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
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserToken: null,
      activeUser: null,
      activeUserTodos: null
    };
    this.setToken = this.setToken.bind(this);
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

  setToken(userToken) {
    this.setState({ activeUserToken: userToken});
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
    console.log(this.state.activeUserToken);
    let activeUserName = this.state.activeUser
      ? this.state.activeUser.username
      : "";
    return (
      <Container>
        <Router>
          <Switch>
            <Route
              expact path="/register"
              render={(props) => <Register {...props} setToken={this.setToken} />}
            />
            <Route expact path="/login" render={(props) => <Login {...props} setToken={this.setToken} />}/>
          </Switch>
          <LoginButton />
        </Router>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header>homely</Header>
          </Grid>
          <Grid item xs={8}>
            <FeedColor>
              <SplitButton></SplitButton>
              <Feed></Feed>
            </FeedColor>
          </Grid>
          <Grid item xs={4}>
            {/* <Sticky>
              <Todo></Todo>
            </Sticky> */}
            <Register></Register>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
