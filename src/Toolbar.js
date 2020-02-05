import React, { Component } from "react";

import tools from "./utils/tools.js";

import "./assets/css/Toolbar.css";

class Toolbar extends Component {
  handleCmd = (e) => {
    console.log(e.target.id);
    this.props.setCmd(e.target.id);

    //TODO: enable only when contents are made inside block
  };

  render() {
    return (
      <div className="toolbar">
        <tools.Image id="tools_image" />
        <tools.Video id="tools_video" />
        <tools.Table id="tools_table" />
        <tools.Graph id="tools_graph" />
        <tools.Pagination id="tools_pagination" onClick={this.handleCmd}/>
        <tools.Highlight id="tools_highlight" />
        <tools.Capture id="tools_capture" />
        <tools.Etc id="tools_etc" />
      </div>
    );
  }
}

export default Toolbar;
