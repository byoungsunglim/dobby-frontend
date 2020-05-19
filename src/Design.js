import React, { Component } from "react";
import Canvas from "./Canvas";

import { parseContents } from "./utils/parseContents";
import { parseBlocks } from "./utils/parseBlocks";
import { getDesign } from './utils/getDesign';

import "./assets/css/Design.css";

class Design extends Component {
  constructor({ draft }){
    super()
    this.state = { draft }
  }
  
  componentDidMount() {
    console.log("Design Mounted...")
    // let design = [];
    // const contents = parseContents(this.props.draft);
    // for (let page of contents) {
    //   const blocks = parseBlocks(page, 2);
    //   console.log(blocks);
    //   design.push(<Canvas design={getDesign(blocks, this.props)}/>);
    // }
    
    // this.setState({
    //   design: design
    // })
  }

  componentWillReceiveProps({ draft }) {
    let design = [];
    const contents = parseContents(draft);
    for (let page of contents) {
      const blocks = parseBlocks(page, 2);
      // console.log(blocks);
      design.push(<Canvas design={getDesign(blocks, this.props)}/>);
    }
    
    this.setState({
      design: design
    })
  }

  render() {
    return (
      <div id="design">
          {this.state.design}
      </div>
    );
  }
}

export default Design;
