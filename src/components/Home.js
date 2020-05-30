import React, { Component } from "react";

import Navigation from "./Navigation";
import Main from "./Main";
import Information from "./Information";

import "../assets/css/Home.css";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Navigation view="home" user={this.props.user}/>
        <Main user={this.props.user}/>
        <Information/>
      </div>
    );
  }
}

export default Home;
