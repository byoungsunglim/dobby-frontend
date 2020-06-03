import React, { Component } from "react";
import Canvas from "./Canvas";

import { parseContents } from "../utils/parseContents";
import { parseBlocks } from "../utils/parseBlocks";

import "../assets/css/Design.css";

class Design extends Component {
  constructor({ draft }){
    super()
    this.state = { 
      draft
    }
  }
  
  componentDidMount() {
    console.log("Design Mounted...");
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentWillReceiveProps({ draft }) {
    let design = [];
    const contents = parseContents(draft);
    for (let i = 0; i < contents.length; i++) {
      const blocks = parseBlocks(contents[i], 2);
      // console.log(blocks);
      design.push(<Canvas page={i} blocks={blocks} {...this.props}/>);
    }
    
    this.setState({
      design: design
    })
  }

  handleResize = () => {
    const design_width = window.innerWidth - 200 - 5 -parseInt(document.getElementById("draft").style.width) - 20;
    document.getElementById("design").style.width = `${design_width}px`;
    document.querySelectorAll("[class=canvas]").forEach((node, idx) => {
      node.style.transform = `scale(${(design_width - 40 * (design_width)/1920) / 1920}) translate(0, ${idx * (-1080 * 1920 / (design_width - 40 * (design_width)/1920) + 1080 + 20)}px)`;
    });

    if (window.innerWidth < 400) {
      document.getElementById("toolbar").style.visibility = 'hidden';
    }
    else if (window.innerWidth < 700) {
      document.getElementById("toolbar").style.visibility = 'visible';
      document.getElementById("toolbar").style.width = '150px';
    }
    else {
      document.getElementById("toolbar").style.visibility = 'visible';
      document.getElementById("toolbar").style.width = '450px';
    }
  }

  render() {
    return (
      <div id="design" style={{width: `${(window.innerWidth - 200 - 5)/2 - 20}px`}}>
          {this.state.design}
      </div>
    );
  }
}

export default Design;
