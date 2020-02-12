import React, { Component } from "react";

import { getDesign } from './utils/getDesign.js';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  state = {
    design: null
  }

  componentWillMount() {
    console.log(this.props.contents);
    this.setState({
      design: getDesign(this.props.contents)
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
