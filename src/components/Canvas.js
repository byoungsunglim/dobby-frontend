import React, { Component } from "react";

import "../assets/css/Canvas.css";

class Canvas extends Component {  
  componentDidMount() {
    console.log("Canvas Mounted...");
  }

  render() {
    return (
      <div className="canvas" style={{transform: `scale(${document.getElementById("design").clientWidth / 1920}) translate(0, ${this.props.page * (-1080 * 1920 / document.getElementById("design").clientWidth + 1080 + 20)}px)`, transformOrigin: 'top left'}}>
          {this.props.design}
      </div>
    );
  }
}

export default Canvas;
