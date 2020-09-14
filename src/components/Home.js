import React, { Component } from "react";

import Navigation from "./Navigation";
import Main from "./Main";
import Information from "./Information";

import "../assets/css/Home.scss";

class Home extends Component {
  handleClick = (e) => {
    // console.log(e.target.parentNode.className);
    if (!e.target.parentNode.className.includes('showHide') && !e.target.id.includes('create') && !e.target.id.includes('entries_selection')) {
      for (let node of document.querySelectorAll("[class=hideOnOut]")) {
        node.setAttribute('style', 'display:none');
      }
    }    
  }

  render() {
    return (
      <div id="home" onClick={(e) => this.handleClick(e)}>
        <Navigation view="home" user={this.props.user}/>
        <Main user={this.props.user}/>
        <Information user={this.props.user}/>
      </div>
    );
  }
}

export default Home;
