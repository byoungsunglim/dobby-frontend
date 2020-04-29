import React, { Component } from "react";
import { getDesign } from './utils/getDesign';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null
  }
  
  componentDidMount() {
    let design = getDesign(this.props);
    this.props.setDesign("update", this.props.cur_page, {design: design})
    this.setState({
      design: design
    })
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
