import React, { Component } from "react";
import Preview from "./Preview.js";

import "./assets/css/Navigation.css";

class Navigation extends Component {
  state = {};

  render() {
    return (
      <div id="navigation">
        <div className="logo">
          Docgabi
        </div>
        {this.props.navigation === "document" ? <Preview {...this} {...this.props}/> : <Preview {...this} {...this.props}/>}
      </div>
    );
  }
}

export default Navigation;
