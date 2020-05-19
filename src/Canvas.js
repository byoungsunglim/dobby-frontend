import React, { Component } from "react";

import { parseContents } from "./utils/parseContents";
import { parseBlocks } from "./utils/parseBlocks";
import { getDesign } from './utils/getDesign';

import "./assets/css/Canvas.css";

class Canvas extends Component {  
  componentDidMount() {
    console.log("Canvas Mounted...")
  }

  render() {
    const width = 1920;
    const height = width * 0.5625;
    const scale = document.getElementById("design").clientWidth / 1920;

    return (
      <div className="canvas" style={{width: width, height: height, transform: `scale(${scale})`, transformOrigin: 'top left'}}>
          {this.props.design}
      </div>
    );
  }
}

export default Canvas;
