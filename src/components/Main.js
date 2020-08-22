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
        <div id="recent_files">
          <span>최근 열어본 파일</span>
        </div>
        <div id="files_folders">

        </div>
        <Documents user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
