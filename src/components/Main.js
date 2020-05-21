import React, { Component } from "react";
import Documents from "./Documents";

import "../assets/css/Main.css";

class Main extends Component {
  componentDidMount() {
    console.log("Main Mounted...");
  }

  render() {
    return (
      <div id="main">
        <div id="header">
          <b>HOME</b>
        </div>
        <Documents user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
