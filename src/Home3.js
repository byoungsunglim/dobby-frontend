import React, { Component, useState, useRef, useEffect } from "react";
import { Textfit } from "react-textfit";

import tools from "./assets/utils/tools.js";

import "./assets/css/Home.css";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.getDesign = this.getDesign.bind(this);
  //   this.getContents = this.getContents.bind(this);
  //   this.
  // }

  state = {
    title: "",
    subtitle: "",
    body: "",
    
    toggleBtn: null,
    canvas: null
  };

  componentWillMount() {
    this.setState({
      toggleBtn: this.designBtn,
      canvas: this.contents
    })
  }

  contents = (
    <div className="contents">
      <textarea id="title" placeholder="Title"></textarea>
      <textarea id="subtitle" placeholder="Subtitle"></textarea>
      <textarea id="body" placeholder="Body"></textarea>
    </div>
  );
  design = null;
  contentsBtn = (
    <button id="contentsBtn" onClick={this.getContents.bind(this)}>
      CONTENTS
    </button>
  );
  designBtn = (
    <button id="designBtn" onClick={this.getDesign.bind(this)}>
      DESIGN
    </button>
  );
  
  handleTitle = (e) => {
    console.log(this.state.title);
    this.setState({
      title: e.target.value
    })
  }
  
  getDesign() {
    const t = document.getElementById("title").value;
    const s = document.getElementById("subtitle").value;
    const b = document.getElementById("body").value;

    var dt = (
      <div className="dtitle">
        <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
          {t}
        </Textfit>
      </div>
    );

    if (t.length > 14) {
      var break_idx = t.indexOf("", t.length / 2);
      var first = t.substring(0, break_idx + 1).trim();
      var second = t.substring(break_idx + 1, t.length).trim();
      dt = (
        <div className="dtitle">
          <Textfit mode="multi" istyle={{ width: "100%", height: "100%" }}>
            {first}<br/>{second}
          </Textfit>
        </div>
      );

      console.log(first);
      console.log(second);
    }

    var ds = (
      <div className="dsubtitle">
        <Textfit mode="multi" id="dsubtitle" style={{ width: "100%", height: "100%" }}>
          {s}
        </Textfit>
      </div>
    )

    this.setState({
      title: t,
      subtitle: s,
      body: b,
      design: [dt, ds],
      canvas: [dt, ds],
      toggleBtn: this.contentsBtn
    });
  }

  getContents() {
    console.log(this.state.title);
    // console.log(this.contents.props.children[0].props.defaultValue);
    // this.contents.props.children[0].props.defaultValue = this.state.title;
    this.contents = (
      <div className="contents">
        <textarea id="title" placeholder="Title" defaultValue={this.state.title}></textarea>
        <textarea id="subtitle" placeholder="Subtitle" defaultValue={this.state.subtitle}></textarea>
        <textarea id="body" placeholder="Body" defaultValue={this.state.body}></textarea>
      </div>
    );

    this.setState({
      canvas: this.contents,
      toggleBtn: this.designBtn
    });   
  }

  render() {
    return (
      <div className="home">
        <div className="preview">
          {this.state.toggleBtn}
        </div>
        <div className="background-canvas">
          <div className="canvas">{this.state.canvas}</div>
        </div>
        <div className="insert-toolbar">
          <tools.Image className="tools" />
          <tools.Video className="tools" />
          <tools.Table className="tools" />
          <tools.Graph className="tools" />
          <tools.Pagination className="tools" />
          <tools.Highlight className="tools" />
          <tools.Capture className="tools" />
          <tools.Etc className="tools" />
        </div>
      </div>
    );
  }
}

export default Home;
