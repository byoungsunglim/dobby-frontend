import React, { Component } from "react";

import Navigation from "./Navigation";
import Main from "./Main";
import Information from "./Information";

import { queryDB } from "../utils/queryDB";

import "../assets/css/Home.scss";

class Home extends Component {
  state = {
    selected_files: {},
  };

  handleClick = (e) => {
    // console.log(e.target);
    if (
      e.target.parentNode &&
      !e.target.parentNode.className.includes("showHide")
    ) {
      for (let node of document.querySelectorAll("[class~=hideOnOut]")) {
        node.setAttribute("style", "display:none");
      }
    }
  };

  handleSelect = (type, doc) => {
    if (type in doc) {
      doc[type] = !doc[type];
    } else {
      doc[type] = true;
    }

    let selected_files = this.state.selected_files;
    selected_files[doc.id] = doc;

    this.setState({
      selected_files: selected_files,
    });

    if (type === "is_important") {
      queryDB("set", "doc", doc.id, {
        is_important: doc[type],
      }).then((result) => {});
    }
  };

  render() {
    return (
      <div id="home" onClick={(e) => this.handleClick(e)}>
        <Navigation view="home" user={this.props.user} />
        <Main
          user={this.props.user}
          selected_files={this.state.selected_files}
          handleSelect={this.handleSelect}
        />
        <Information user={this.props.user} selected_files={this.state.selected_files} />
      </div>
    );
  }
}

export default Home;
