import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/Toolbar.css";

class Toolbar extends Component {
  render() {
    return (
      <div id="toolbar">
        <tools.Image className="tools"/>
        <tools.Media className="tools"/>
        <tools.Table className="tools"/>
        <tools.Graph className="tools"/>
        <tools.Bulletlist className="tools"/>
        <tools.Numlist className="tools"/>
        <tools.Pagination className="tools"/>
        <tools.Capture className="tools"/>
        {/* <tools.Etc className="tools"/> */}
      </div>
    );
  }
}

export default Toolbar;
