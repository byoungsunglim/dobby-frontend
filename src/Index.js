import React, { Component } from "react";

import "./assets/css/Index.css";

class Index extends Component {
  state = {
    index: null
  }

  componentWillMount() {
    let index = [];
    for (let page = 0; page < this.props.index.length; page++) {
      index.push(<li key={`${page}`}><input id={`idx_title_${page}`} defaultValue={`${this.props.index[page].title}`} autoFocus></input></li>);
    }
    
    this.setState({
      index: index
    })
  }

  handleChange = (e) => {
    const t = e.target.id.split("_");
    let block = parseInt(t[2]);
    let data = {
      block: block,
      value: {
        [t[1]]: e.target.value,
      }
    } 
    
    if (this.props.index[block].pages.length === 0)
    {
      data.value.pages = [this.props.contents.length];
      this.props.setContents('add', {title: "", subtitle: "", body: ""})
    }

    this.props.setIndex('update', data);
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        let current_idx = parseInt(e.target.id.substring(e.target.id.length -1));
        if (current_idx === this.state.index.length - 1) {
          this.setState({
            index: this.state.index.concat(<li key={`${this.state.index.length}`}><input id={`idx_title_${this.state.index.length}`} autoFocus></input></li>)
          })
          
          this.props.setIndex("add", {title: "", pages: []});
        }
        else {
          document.getElementById(`idx_title_${current_idx + 1}`).focus()
        }
        this.props.setBlocks();
        break;
      case 'Tab':
        e.preventDefault();
        
      default:
    }
  }

  render() {
    return (
        <div className="index" onChange={this.handleChange} onKeyDown={this.handleKeyDown}>
          <b style={{fontSize: '14pt'}}>목차</b>
          <br />
          <ol>
          {this.state.index}
          </ol>
        </div>
    );
  }
}

export default Index;
