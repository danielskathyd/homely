import React, { Component } from "react";
import "./mylist.css";
import axios from "axios";
import Fade from "react-reveal/Fade";

export class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    let user = this.props.user ? this.props.user.username + "'s" : "my";
    return (
      <div className="list-container">
        <div className="header">
          <h1 className="todo-header">{user} to do list</h1>
        </div>
        <hr></hr>
        <ul className="todo-list">
          <form
            className="add-todo-form"
            onSubmit={() => {
              this.props.onSubmit(this.state.text);
              this.setState({
                text: ""
              });
            }}
          >
            <li>
              <input
                onChange={this.onChange}
                type="text"
                className="new-todo"
                value={this.state.text}
                placeholder="Add a new task..."
              ></input>
            </li>
            <input
              type="submit"
              value="Submit"
              style={{ display: "none" }}
            ></input>
            {this.props.todos}
          </form>
        </ul>
      </div>
    );
  }
}
