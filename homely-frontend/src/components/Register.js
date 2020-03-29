import React, { Component } from 'react';
import "./register.css"

export default function Register() {
    return(
        <div className="container">
            <p className="header">Create an account</p>
            <p className="body">We know staying at home can be hard.
               That’s why we want to help you stay productive
               and share your successes with those around you. </p>
            <p className="body">Create an account to connect with others and
               exchange ideas on how we can tackle self isolation together.</p>
            <form>
                <label>Email</label><br></br>
                <input className="login-input" size="50" type="text" placeholder="johnnyappleseed@gmail.com"></input><br></br>
                <label>Username</label><br></br>
                <input className="login-input" size="50" type="text" placeholder="johnnyappleseed"></input><br></br>
                <label>Password</label><br></br>
                <input className="login-input" size="50" type="text" placeholder="••••••••••••"></input><br></br>
                <label>Verify Password</label><br></br>
                <input className="login-input" size="50" type="text" placeholder="••••••••••••"></input>
            </form>
            <button class="styled-button">Connect</button>
        </div>
    );
}