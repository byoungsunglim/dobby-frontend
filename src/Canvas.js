import React, { Component } from "react";
import { Textfit } from "react-textfit";

import "./assets/css/Canvas.css";

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.getDesign = this.getDesign.bind(this)
  }

  state = {
    t: this.props.contents.title,
    s: this.props.contents.subtitle,
    b: this.props.contents.title,

    design: null
  }

  componentWillMount() {
    console.log(this.props.contents);
    this.getDesign();
  }

  getDesign() {
    var dt = (
      <div className="dtitle">
        <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
          {this.state.t}
        </Textfit>
      </div>
    )

    if (this.state.t.length > 14 && this.state.t.indexOf(" ") > 0) {
      var break_idx = this.state.t.indexOf("", this.state.t.length / 2);
      var first = this.state.t.substring(0, break_idx + 1).trim();
      var second = this.state.t.substring(break_idx + 1, this.state.t.length).trim();
      dt = (
        <div className="dtitle">
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {first}<br/>{second}
          </Textfit>
        </div>
      );
    }

    var ds = (
      <div className="dsubtitle">
        <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
          {this.state.s}
        </Textfit>
      </div>
    );

    this.setState({
      design: [dt, ds]
    })
  };
  

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
