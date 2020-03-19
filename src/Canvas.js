import React, { Component } from "react";

import { getDesign } from './utils/getDesign.js';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null
  }
  
  componentDidMount() {
    console.log(this.props.contents[this.props.cur_page].content);
    let design = getDesign(this.props.contents[this.props.cur_page]);
    this.props.setDesign("update", this.props.cur_page, {design: design})
    this.setState({
      design: design
    })
  }  

  render() {
    return (
        <div className="background-canvas">
            <div className="canvas">
              {this.state.design}
            </div>
        </div>
    );
  }
}

export default Canvas;
