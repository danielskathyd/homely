import React, { Component } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { AppBar } from "./components/AppBar";
import Todo from "./components/Todo";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
const classes = useStyles();

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
      <div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button color="primary">Hello {activeUserName}</Button>
            </Grid>
            <Grid item xs={6}>
              <Todo></Todo>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
              <h2>Here are your daily todos:</h2>
            </Grid>
            <Grid item xs={3}>
              <ol>{this.renderTodos()}</ol>
            </Grid>
            <Grid item xs={3}>
              <p>hi</p>
            </Grid>
            <Grid item xs={3}>
              <p>hi</p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
