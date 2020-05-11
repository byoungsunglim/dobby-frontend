import React, { Component } from "react";

import { parseContents } from "./utils/parseContents";
import { parseBlocks } from "./utils/parseBlocks";
import { getDesign } from './utils/getDesign';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null
  }
  
  componentDidMount() {
    const [contents, levels, counter] = parseContents(this.props.draft, this.props.cur_id);
    console.log(contents, levels, counter);
    // const blocks = parseBlocks(contents, levels, counter, 1);
    // console.log(blocks);
    // let design = getDesign(this.props);
    // this.props.setDesign("update", this.props.cur_page, {design: design})
    // this.setState({
    //   design: design
    // })
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
