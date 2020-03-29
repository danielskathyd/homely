import React, { Component } from 'react';
import "./mylist.css"

export default function Register() {
    return(
        <div className="container">
            <div className="header">
                <h1 className="todo-header">my to do list</h1>
            </div>
            <hr></hr>
            <ul className="todo-list">
                <li><input type="text" class="new-todo" placeholder="Add a new task..."></input></li>
                <li>Hit the gym</li>
                <li class="checked">Pay bills</li>
                <li>Meet George</li>
                <li>Buy eggs</li>
                <li>Read a book</li>
                <li>Organize office</li>
            </ul>
        </div>
    );
}