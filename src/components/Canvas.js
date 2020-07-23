import React, { Component } from "react";
import { getDesign } from '../utils/getDesign';

import CanvasToolbar from "./CanvasToolbar";

import "../assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    showToolbar: false
  }

  componentDidMount() {
    console.log("Canvas Mounted...");
  }

  handleMouseEnter = (e) => {
    this.setState({
      showToolbar: true
    })
  }

  handleMouseLeave = (e) => {
    this.setState({
      showToolbar: false
    })
  }

  handleAlign = (display) => {
    this.props.setDraft("update", this.props.blocks[0][0].id, {display: display});
  }

  render() {
    return (
      <div className="canvas" page={this.props.page} onMouseEnter={(e) => this.handleMouseEnter(e)} onMouseLeave={(e) => this.handleMouseLeave(e)} style={{transform: `scale(${document.getElementById("design").clientWidth / 1920}) translate(0, ${this.props.page * (-1080 * 1920 / document.getElementById("design").clientWidth + 1080 + 20)}px)`, transformOrigin: 'top left'}}>
          {getDesign(this.props.blocks)}
          {this.state.showToolbar ? <CanvasToolbar display={this.props.blocks[0][0].display} handleAlign={this.handleAlign}/> : null}
      </div>
    );
  }
}

export default Canvas;
