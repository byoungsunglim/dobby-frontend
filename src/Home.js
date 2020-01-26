import React, { Component } from "react";
import { Textfit } from "react-textfit";

import Preview from './Preview.js';
import Document from './Document.js';
import Canvas from './Canvas.js';
import Toolbar from './Toolbar.js';

import "./assets/css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props)

    this.setView = this.setView.bind(this)
    this.setContents = this.setContents.bind(this)
    this.setCmd = this.setCmd.bind(this)
  }

  state = {
    view: null,
    current_page: 0,
    contents: [{
      page: 0,
      title: "",
      subtitle: "",
      body: ""
    }],
    design: null,
    toggleBtn: null,
    cmd: null
  };

  setView(contents) {
    this.setState({
      view: this.state.view === "document" ? "design" : "document",
    })
  }

  setContents(contents, page) {
    this.setState({
      contents: this.state.contents.slice(0, page).concat(contents).concat(this.state.contents.slice(page+1))
    })
  }

  setCmd(cmd) {
    this.setState({
      cmd: cmd
    })
  }

  componentWillMount() {
    this.setState({
      view: "document",
      toggleBtn: this.designBtn
    })
  }

  render() {
    return (
      <div className="home">
        <Preview view={this.state.view} setView={this.setView} setContents={this.setContents}/>
        {this.state.view === "document" ? <Document contents={this.state.contents} setContents={this.setContents} cmd={this.state.cmd} setCmd={this.setCmd}/> : <Canvas contents={this.state.contents[this.state.current_page]}/>}
        <Toolbar setCmd={this.setCmd}/>
      </div>
    );
  }
}

export default Home;
