import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import axios from "axios"
import { AppBar } from "./components/AppBar"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Button color="primary">Hello World</Button>
      </div>
    );
  }
}

export default App;
