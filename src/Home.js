import React, { Component } from "react";

import Navigation from './Navigation.js';
import Information from './Information.js';
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
    this.setDesign = this.setDesign.bind(this)
    this.setCmd = this.setCmd.bind(this)
  }

  state = {
    view: null,
    cur_page: 0,
    index: [{
      id: "1",
      title: "",
      pages: [],
    }],
    contents: [{
      page: 0,
      content: null
    }],
    design: [{
      page: 0,
      design: null
    }],
    toggleBtn: null,
    cmd: null
  };

  setView = () => {
    this.setState({
      view: this.state.view === "document" ? "canvas" : "document",
    })
  }

  setPage = (cur_page) => {
    this.setState({
      cur_page: cur_page
    })
  }

  setIndex = (handle, id, data) => {
    const { index } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          index: index.map(
            idx => id === idx.id
              ? { ...idx, ...data }
              : idx
          )
        })
        break;
      case 'add':
        this.setState({
          index: index.concat({
            id: id,
            title: data.title,
            pages: data.pages,
          })
        })
        break;
      case 'remove':
        this.setState({
          index: index.filter(idx => idx.id !== id)
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

  setContents = (handle, page, data) => {
    const { contents } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          contents: contents.map(
            content => page === content.page
              ? { ...content, ...data }
              : content
          )
        })
        break;
      case 'add':
        this.setState({
          contents: contents.concat({
            page: contents.length,
            content: null
          })
        })
        break;
      case 'remove':
        this.setState({
          contents: contents.filter(content => content.page !== page)
        })
        break;
      case 'set':
      default:     
    }
  }

  setDesign = (handle, page, data) => {
    const { design } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          design: design.map(
            d => page === d.page
              ? { ...d, ...data }
              : d
          )
        })
        break;
      case 'add':
        this.setState({
          design: design.concat({
            page: design.length,
            design: data
          })
        })
        break;
      case 'remove':
        this.setState({
          design: design.filter(d => d.page !== page)
        })
        break;
      case 'set':
      default:     
    }
  }

  setCmd = (cmd) => {
    this.setState({
      cmd: cmd
    })
  }

  componentDidMount() {
    this.setState({
      view: "document",
      toggleBtn: this.designBtn
    })
  }

  render() {
    return (
      <div className="home">
        <Navigation {...this} {...this.state}/>
        {this.state.view === "document" ? <Document {...this} {...this.state}/> : <Canvas {...this} {...this.state}/>}
        <Information/>
        <Toolbar setCmd={this.setCmd}/>
      </div>
    );
  }
}

export default Home;
