import React, { Component } from "react";
import { Link } from "react-router-dom";

export class LoginButton extends Component {
  render() {
    return(
      <button>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </button>
    );
  }
}
