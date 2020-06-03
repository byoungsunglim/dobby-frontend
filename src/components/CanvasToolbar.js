import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/CanvasToolbar.css";

class CanvasToolbar extends Component {
  handleClick = () => {
    if (this.props.display === 'table') {
      this.props.handleAlign('column');
    }
    else {
      this.props.handleAlign('table');
    }
    
  }

  render() {
    return (
      <div id="canvas_toolbar">
        <label class="switch">
          <input type="checkbox" checked={this.props.display === 'table'} onClick={() => this.handleClick()}/>
          <span class="slider round"></span>
        </label>
      </div>
    );
  }
}

export default CanvasToolbar;
