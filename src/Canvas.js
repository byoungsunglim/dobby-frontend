import React, { Component } from "react";

import { getDesign } from './utils/getDesign.js';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null
  }
  
  componentDidMount() {
    let design = getDesign(this.props.cur_page, this.props.document[this.props.document.findIndex(content => content.page === this.props.cur_page)].content, this.props);
    this.props.setDesign("update", this.props.cur_page, {design: design})
    this.setState({
      design: design
    })
  }
  
  handleClick = (e) => {
    console.log(e.target);
  }

  render() {
    return (
        <div id="background-canvas" onClick={this.handleClick}>
            <div id="canvas">
              {this.state.design}
            </div>
        </div>
    );
  }
}

export default Canvas;
