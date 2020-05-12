import React, { Component } from "react";

import { parseContents } from "./utils/parseContents";
import { parseBlocks } from "./utils/parseBlocks";
import { getDesign } from './utils/getDesign';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null,
  }
  
  componentDidMount() {
    const [contents, levels, counter] = parseContents(this.props.draft, this.props.cur_id);
    console.log(contents, levels, counter);
    const blocks = parseBlocks(contents, 2);
    console.log(blocks);
    let design = getDesign(blocks);
    this.props.setDesign("update", this.props.cur_page, {design: design})
    this.setState({
      design: design
    })
    // document.getElementById('canvas').style.width = `${window.screen.width * 0.7 * 0.8}px`;
    // document.getElementById('canvas').style.height = `${window.screen.width * 0.7 * 0.8 * 0.5625}px`;
    window.addEventListener("resize", this.canvasResize);
  }

  canvasResize() {
    console.log(window.screen.height, window.innerHeight, window.screen.width, window.innerWidth)
    document.getElementById('canvas').style.transform = `scale(${window.innerWidth / window.screen.width})`;
  }

  render() {
    return (
        <div id="backgroundCanvas" onClick={this.handleClick}>
            <div id="canvas">
               {this.state.design}
            </div>
        </div>
    );
  }
}

export default Canvas;
