import React, { Component } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Todo from "./components/Todo";

const Container = styled("div")`
  margin: auto;
  justify-content: center;
  text-align: center;
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button color="primary">Hello {activeUserName}</Button>
          </Grid>
          <Grid item xs={8}>
            <p>what's up</p>
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
