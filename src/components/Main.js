import React, { Component } from "react";

import Recents from "./Recents";
import Entries from "./Entries";
import Search from "./Search";

import "../assets/css/Main.scss";

class Main extends Component {
  componentDidMount() {
    console.log("Main Mounted...");
  }

  render() {
    return (
      <div id="main">
        <div id="header">
          <span id="main_title">HOME</span>
          <Search/>
        </div>
        <Recents user={this.props.user}/>
        <Entries user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
