import React, { Component } from "react";

import "./assets/css/Preview.css";

class Preview extends Component {
  state = {
    preview: null
  }
  
  componentDidMount() {
    if (this.props.view === "document") {
      let design = [];
      for (let i = 0; i < this.props.design.length; i++) {
        design.push(this.props.design[i].design);
      }
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
      for (let i = 0; i < this.props.design.length; i++) {
        design.push(
          <div className={`preview_${this.props.design[i].page}`}>
            <div className={`design_${this.props.design[i].page}`}>
              {this.props.design[i].design}
            </div>
          </div>
        );
      }
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
