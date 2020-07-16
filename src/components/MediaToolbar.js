import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/MediaToolbar.css";

class MediaToolbar extends Component {


  render() {
    return (
      <div id="media_toolbar">
        <tools.LeftAlign className="tools"/>
        <tools.TopAlign className="tools"/>
        <tools.RightAlign className="tools"/>
        <tools.FullWidth className="tools"/>
      </div>
    );
  }
}

export default MediaToolbar;
