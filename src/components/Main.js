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
        <div id="main_header">
          <span id="main_title">HOME</span>
          <Search />
        </div>
        <div id="main_body">
          <Recents user={this.props.user} />
          <Entries user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default Main;
