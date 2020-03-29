import React, { Component } from 'react';
import "./register.css"

export default function Register() {
    return(
        <div className="container">
            <p className="header">Sign in</p>
            <form>
                <label>Username</label><br></br>
                <input size="50" type="text" placeholder="johnnyappleseed"></input><br></br>
                <label>Password</label><br></br>
                <input size="50" type="text" placeholder="••••••••••••"></input><br></br>
                <p class="forgot-password">Forgot password?</p>
            </form>
            <button class="styled-button">Connect</button><br></br>
            <button class="styled-button">I don't have an account</button>
        </div>
    );
}