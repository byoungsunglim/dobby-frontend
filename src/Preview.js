import React, { Component } from "react";

import "./assets/css/Preview.css";

class Preview extends Component {
  state = {
    preview: null
  }
  
  componentWillMount() {
    if (this.props.view === "document") {
      let design = [];
      this.props.design.forEach((d) => {
        design.push(d.design);
      })
      this.setState({
        preview: design
      })
    }
    else {

    }
  }
  
  handleChange = () => {
    this.props.setView();
    if (this.props.view === "canvas") {
      console.log(this.props.design);
      let design = [];
      this.props.design.forEach((d) => {
        design.push(
          <div className={`preview_${d.page}`}>
            <div className={`design_${d.page}`}>
              {d.design}
            </div>
          </div>
        );
      })
      this.setState({
        preview: design
      })
    }
    else {
    }
  }

  contentsBtn = (<button id="contentsBtn" onClick={this.handleChange}>CONTENTS</button>);
  designBtn = (<button id="designBtn" onClick={this.handleChange}>DESIGN</button>);

  render() {
    return (
      <div className="preview">
      {this.props.view === "document" ? this.designBtn : this.contentsBtn}
      {this.state.preview}
      </div>
    );
  }
}

export default Preview;
