import React, { Component } from "react";

import RecentFiles from "./RecentFiles";
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
          <RecentFiles user={this.props.user} selection={this.props.selection} handleSelect={this.props.handleSelect}/>
          <Entries user={this.props.user} selection={this.props.selection} handleSelect={this.props.handleSelect}/>
        </div>
      </div>
    );
  }
}

export default Main;
