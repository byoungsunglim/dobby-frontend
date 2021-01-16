import React, { Component } from "react";

import Navigation from "./Navigation";
import Main from "./Main";
import Information from "./Information";

import "../assets/css/Home.scss";

class Home extends Component {
  state = {
    selected_list: [],
  };

  handleClick = (e) => {
    console.log(e.target);
    if (!e.target.parentNode.className.includes("showHide")) {
      for (let node of document.querySelectorAll("[class~=hideOnOut]")) {
        node.setAttribute("style", "display:none");
      }
    }

    // if (e.target.parentNode.className.includes("select")) {
    //   console.log(e.target.parentNode.parentNode);
    //   if (e.target.className === "unselected") {
    //     for (let node of e.target.parentNode.parentNode.childNodes) {
    //       console.log(node);
    //       if (node.className.includes("file_title")) {
    //         this.setState({
    //           selected_list: this.state.selected_list.concat({
    //             id: e.target.parentNode.parentNode.id,
    //             title: node.innerText,
    //           }),
    //         });

    //         break;
    //       }

    //       if (node.className.includes("file_list_info")) {
    //         this.setState({
    //           selected_list: this.state.selected_list.concat({
    //             id: e.target.parentNode.parentNode.id,
    //             title: node.childNodes[0].innerText,
    //           }),
    //         });

    //         break;
    //       }
    //     }
    //   } else {
    //   }
    // }
  };

  render() {
    return (
      <div id="home" onClick={(e) => this.handleClick(e)}>
        <Navigation view="home" user={this.props.user} />
        <Main user={this.props.user} />
        <Information user={this.props.user} />
      </div>
    );
  }
}

export default Home;
