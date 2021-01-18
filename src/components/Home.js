import React, { Component } from "react";

import Navigation from "./Navigation";
import Main from "./Main";
import Information from "./Information";

import { queryDB } from "../utils/queryDB";

import "../assets/css/Home.scss";

class Home extends Component {
  state = {
    selection: {},
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

    let new_selection = this.state.selection;
    new_selection[doc.id] = doc;

    this.setState({
      selection: new_selection,
    });

    queryDB("set", "doc", doc.id, {
      is_important: doc[type],
    }).then((result) => {});
  };

  render() {
    return (
      <div id="home" onClick={(e) => this.handleClick(e)}>
        <Navigation view="home" user={this.props.user} />
        <Main
          user={this.props.user}
          selection={this.state.selection}
          handleSelect={this.handleSelect}
        />
        <Information user={this.props.user} />
      </div>
    );
  }
}

export default Home;
