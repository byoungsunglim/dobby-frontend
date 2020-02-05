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
    this.setIndex = this.setIndex.bind(this)
    this.setContents = this.setContents.bind(this)
    this.setCmd = this.setCmd.bind(this)
  }

  state = {
    view: null,
    current_page: 0,
    index: [{
      block: 0,
      title: "",
      pages: [],
      index: []
    }],
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

  setView() {
    this.setState({
      view: this.state.view === "document" ? "design" : "document",
    })
  }

  // setIndex = (block, data) => {
  //   const { index } = this.state;
  //   this.setState({
  //     index: index.map(
  //       idx => block === idx.block
  //         ? { ...idx, ...data }
  //         : idx
  //     )
  //   })
  // }

  setIndex = (handle, data) => {
    const { index } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          index: index.map(
            idx => data.block === idx.block
              ? { ...idx, ...data.value }
              : idx
          )
        })
        break;
      case 'add':
        this.setState({
          index: index.concat({
            block: index.length,
            title: data.title,
            pages: data.pages,
            index: data.index
          })
        })
        break;
      case 'set':
        this.setState({
          index: data
        })
        break;
      default:
    }
  }

  // addIndex = (data) => {
  //   const { index } = this.state;
  //   this.setState({
  //     index: index.concat({
  //       block: index.length,
  //       title: data.title,
  //       pages: data.pages
  //     })
  //   })
  // }

  setContents(handle, data) {
    const { contents } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          contents: contents.map(
            content => data.page === content.page
              ? { ...content, ...data.value }
              : content
          )
        })
        break;
      case 'add':
        this.setState({
          contents: contents.concat({
            page: contents.length,
            title: data.title,
            subtitle: data.subtitle,
            body: data.body
          })
        })
        break;
      case 'set':
      default:     
    }
  }

  // addContents = (data) => {
  //   const { contents } = this.state;
  //   this.setState({
  //     contents: contents.concat({
  //       page: contents.length,
  //       title: data.title,
  //       subtitle: data.subtitle,
  //       body: data.body
  //     })
  //   })
  // }

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
        {this.state.view === "document" ? <Document {...this} {...this.state}/> : <Canvas contents={this.state.contents[this.state.current_page]}/>}
        <Toolbar setCmd={this.setCmd}/>
      </div>
    );
  }
}

export default Home;
