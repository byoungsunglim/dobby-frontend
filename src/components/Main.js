import React, { Component } from "react";

import Documents from "./Documents";
import Search from "./Search";

import "../assets/css/Main.css";

class Main extends Component {
  componentDidMount() {
    console.log("Main Mounted...");
  }

  render() {
    return (
      <div id="main">
        <div id="header">
          <span id="title">HOME</span>
          <Search/>
        </div>
        <Documents user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
