import React, { Component } from 'react';
import "./register.css";
import FoodIcon from "@material-ui/icons/Restaurant";
import FitnessIcon from "@material-ui/icons/FitnessCenter";
import ArtIcon from "@material-ui/icons/Brush";
import GameIcon from "@material-ui/icons/VideogameAsset";
import HeartIcon from "@material-ui/icons/Favorite";

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        title: '',
        description: '',
        completed: true,
        owner: '',
        image: null,
        activity_type: ''
      },
      selectedCategory: -1
    }
  }

  handleCatButton(e, i) {
    if(this.state.selectedCategory >= 0) {
      let prevSelected = document.getElementById("cat-btn-" + this.state.selectedCategory);
      prevSelected.className = "cat-button";
    }
    let newSelected = document.getElementById("cat-btn-" + i);
    newSelected.className = "cat-button-selected";
    this.setState({
      selectedCategory: i
    });
  }

  fileSelectedHandler(e) {
    this.setState({
      image: e.target.files[0]
    });
  }

  onChange = e => {
    let myInputs = this.state.inputs;
    myInputs[e.target.name] = e.target.value;
    this.setState({ inputs: myInputs });
  }

  render() {
    let errorText = this.state.registerError ? "Error: invalid input!" : "";
    if(this.props.activeUser) return null;
    return(
        <div className="upload-container">
            <p className="log-header">Full Send.</p>
            <p className="body">It's time to share the small (or big) successes!</p>
            <form onSubmit={this.onSubmit}>
                <label>Title</label><br></br>
                <input size="50" type="text" name="title" className="login-input"
                  placeholder="johnnyappleseed@gmail.com"
                  onChange={this.onChange} defaultValue={this.props.title}></input><br></br>
                <label>Picture/Video</label><br></br>
                <input type="file" onChange={this.fileSelectedHandler} name="image"
                  className="upload-btn styled-button"/><br></br>
                <label>Description</label><br></br>
                <textarea rows="2" cols="25" size="200" type="text" name="description"
                  className="login-input large-login-input"
                  placeholder="Write a short description about what you accomplished today!"
                  onChange={this.onChange} value={this.state.inputs.username}></textarea><br></br>
                <label>Category</label><br></br>
                <div className="row">
                  <div className="cat-button" id="cat-btn-1" onClick={(e) => this.handleCatButton(e, 1)}><FoodIcon /></div>
                  <div className="cat-button" id="cat-btn-2" onClick={(e) => this.handleCatButton(e, 2)}><ArtIcon/></div>
                  <div className="cat-button" id="cat-btn-3" onClick={(e) => this.handleCatButton(e, 3)}><GameIcon/></div>
                  <div className="cat-button" id="cat-btn-4" onClick={(e) => this.handleCatButton(e, 4)}><FitnessIcon /></div>
                  <div className="cat-button" id="cat-btn-5" onClick={(e) => this.handleCatButton(e, 5)}> <HeartIcon /></div>
                </div><br></br>
                <div className="container">
                  <button class="upload-btn styled-button">Share</button>
                  <div className="error body">{errorText}</div>
                </div>
            </form>
        </div>
    );
  }

}
