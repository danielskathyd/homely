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
import { MyList } from "./components/MyList";
import { Upload } from "./components/Upload";
import Logo from "./images/logo.png";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import ModalImage from "react-modal-image";
import Fade from "react-reveal/Fade";

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
  background: #edcadb;
  padding: 40px;
  margin: 0px 40px 0px 70px;
`;

const Sticky = styled("div")`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const exampleTodos = [
  { id: 5, title: "Hit the gym", completed: false, owner: "bryan" },
  { id: 6, title: "Pay bills", completed: true, owner: "bryan" },
  { id: 7, title: "Meet George", completed: false, owner: "bryan" },
  { id: 8, title: "Buy eggs", completed: false, owner: "bryan" },
  { id: 9, title: "Read a book", completed: false, owner: "bryan" },
  {
    id: 10,
    title: "Organize office",
    description: "a",
    completed: false,
    owner: 1
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserToken: null,
      activeUser: null,
      activeUserTodos: exampleTodos,
      loggingIn: false,
      todoList: [],
      isFetchingData: false,
      data: null,
      sharedTodoTitle: null
    };
    this.setToken = this.setToken.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.generateTodoList = this.generateTodoList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.generateTodoList();
    this.setState({ isFetchingData: true });
    axios
      .get("http://localhost:8000/api/todos")
      .then(res => {
        console.log("hello");
        this.setState({
          isFetchingData: false,
          data: res.data.reverse()
        });
      })
      .catch(err => console.log(err));
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
          activeUserTodos: res.data.ptodo_set
        });
        this.generateTodoList();
      })
      .catch(err => console.log(err));
  }
  setToken(userToken) {
    this.setState({ activeUserToken: userToken, loggingIn: false });
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
          activeUserTodos: exampleTodos
        });
        this.generateTodoList();
      })
      .catch(err => console.log(err));
  }

  handleUploadButton(e, i) {
    console.log(this.state.activeUserTodos);
    let todo = this.state.activeUserTodos[i];
    console.log("SHARED TODO NAME");
    console.log(todo.title);
    document.getElementById(i).className += " exit-left";
    setTimeout(() => {
      this.deleteTodo(i);
      this.setState({
        sharedTodoTitle: todo.title
      });
    }, 2000);
  }


  generateTodoList() {
    if (!this.state.activeUserTodos) return;
    var todoList = [];
    for (let i = 0; i < this.state.activeUserTodos.length; i++) {
      let todo = this.state.activeUserTodos[i];
      let className = todo.completed ? "checked" : "";
      let title = todo.title;
      let upload = todo.completed
        ? <div onClick={(e) => {
            this.handleUploadButton(e, i);
            e.stopPropagation();
          }} className="upload">↑</div>
        : null;
      todoList.push(
          <li id={i} onClick={() => {this.toggleComplete(i)}} className={className}>
            {title}
            {upload}
            <div onClick={(e) => {
              this.deleteTodo(i);
              e.stopPropagation();
            }} className="close">X</div>
          </li>

      );
    }
    this.setState({
      todoList: todoList
    });
    console.log("The following todo list was generated:", todoList);
  }

  toggleComplete(i) {
    if (this.state.activeUserTodos.length <= i) return;
    let myTodos = this.state.activeUserTodos;
    myTodos[i].completed = !myTodos[i].completed;

    // not logged in
    if (!this.state.activeUser) {
      console.log("Not logged in");
      this.setState({
        activeUserTodos: myTodos
      });
      this.generateTodoList();
      return;
    }
    console.log("attempting request on", myTodos[i].id, "with", myTodos[i]);
    axios
      .put(
        `http://localhost:8000/api/ptodos/${myTodos[i].id}/`,
        {
          title: myTodos[i].title,
          description: myTodos[i].description,
          completed: myTodos[i].completed
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log("successfully wrote");
        this.setState({
          activeUserTodos: myTodos
        });
        this.generateTodoList();
      })
      .catch(err => console.log(err));
  }

  addTodo(newData) {
    console.log("adding", newData);
    let newTodo = {
      title: newData,
      completed: false,
      owner: this.state.activeUser ? this.state.activeUser.username : ""

    };

    // If user isn't logged in
    if (!this.state.activeUser) {
      let myTodos = this.state.activeUserTodos;
      myTodos.push(newTodo);
      this.setState({ activeUserTodos: myTodos });
      this.generateTodoList();
      console.log("User isnt logged in");
      return;
    }

    console.log("Attempting to post", newTodo);
    axios
      .post("http://localhost:8000/api/ptodos/", newTodo)
      .then(res => {
        console.log("Todo successfully posted")
        let myTodos = this.state.activeUserTodos;
        myTodos.push(newTodo);
        this.setState({ activeUserTodos: myTodos });
        this.fetchUserInfo();
        // console.log(myTodos);
        return;
      })
      .catch(err => console.log(err));
    return;
  }

  deleteTodo(i) {
    let myTodos = this.state.activeUserTodos;
    let removedTodo = myTodos.splice(i, 1)[0];
    console.log("Removed todo:", removedTodo.title);
    this.setState({
      activeUserTodos: myTodos
    });
    this.generateTodoList();
    // If we're logged in
    if (this.state.activeUser) {
      console.log("Attempting to delete todo with id:", removedTodo.id);
      axios
        .delete(`http://localhost:8000/api/ptodos/${removedTodo.id}/`)
        .then(res => {
          console.log("Successfully deleted todo with id", removedTodo.id);
        })
        .catch(err => console.log(err));
    }
  }

  uploadTodo(state) {
    console.log(state);
    let myCategory;
    switch(state.selectedCategory) {
      case 1:
        myCategory = "food";
        break;
      case 2:
        myCategory = "art";
        break;
      case 3:
        myCategory = "gaming";
        break;
      case 4:
        myCategory = "fitness";
        break;
      case 5:
        myCategory = "hobby";
        break;
    }
    let myTodo = state.inputs;
    let myPublicTodo = {
      title: myTodo.title,
      description: myTodo.description,
      completed: true,
      owner: this.state.activeUser ? this.state.activeUser.username : "Anonymous",
      activity_type: myCategory
    }
    console.log("Attempting to post", myPublicTodo);
    axios
      .post("http://localhost:8000/api/todos/", myPublicTodo)
      .then(res => {
        console.log("Todo successfully posted")
        console.log(res.data);
        let myData = this.state.data;
        myData.push(res.data);
        this.setState({
          data: myData,
          sharedTodoTitle: null
        });
      })
      .catch(err => console.log(err));
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
        <button
          className="log-button"
          onClick={() => this.setState({ loggingIn: true })}
        >
          Login
        </button>
      </Link>
    );
    let userGreeting = this.state.activeUser
      ? "welcome " + activeUserName + "!"
      : "";
    let myList = this.state.loggingIn ? null : (
      <MyList
        onSubmit={this.addTodo}
        todos={this.state.todoList}
        user={this.state.activeUser}
      ></MyList>
    );

    if (this.state.isFetchingData || !this.state.data) {
      return <p></p>;
    }

    let tileData = this.state.data;
    console.log(this.state.sharedTodoTitle);
    let upload = this.state.sharedTodoTitle
      ? <Upload onSubmit={(state) => this.uploadTodo(state)} title={this.state.sharedTodoTitle}/> : null;
    console.log("UPLOAD STATE:", upload)
    console.log(tileData);
    return (
      <Container>
        <Router>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Header>
                <div className="logo-text">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#F0E9E4" }}
                    onClick={() => this.setState({ loggingIn: false })}
                  >
                    homely
                    <img src={Logo} className="logo" />
                  </Link>
                  {logButton}
                  <div className="user-greeting">{userGreeting}</div>
                </div>
              </Header>
            </Grid>
            <Grid item xs={8}>
              <FeedColor>
                <SplitButton></SplitButton>
                <Fade left>
                  <Feed className="feed" data={tileData}></Feed>
                </Fade>
              </FeedColor>
            </Grid>
            <Grid item xs={4}>
              {myList}
              {upload}
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
          <Grid item xs={4}></Grid>
        </Router>
      </Container>
    );
  }
}

export default App;
