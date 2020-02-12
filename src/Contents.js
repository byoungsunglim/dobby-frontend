import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import "./assets/css/Contents.css";

class Contents extends Component {
  handleChange = (e) => {
    let [id, page] = e.target.id.split("_");
    let data = {
      page: parseInt(page),
      value: {
        [id]: e.target.value
      }
    }

    this.props.setContents('update', data);
    this.props.setPage(parseInt(page));
  }

  handleKeyDown = (e) => {
    let value = e.target.value
    switch (e.key) {
      case 'Enter':
        if (value.substr(value.lastIndexOf("\n")+1).includes('\u2022')) {
          value += '\u2022';
        }
        break;
      case 'Tab':
        e.preventDefault();
        let values = value.split("\n");
        console.log(values[values.length - 1])
        if (values[values.length - 1].includes('\u2022')) {
          console.log("##")
          e.target.value += '\t';
        }
        else {
          e.target.value += `&#9679`;
        }
        break;
      case 'Backspace':        
        break;
      default:
    }
  }

  render() {
    return (
        <div className={"contents_" + this.props.page} onChange={this.handleChange}>
          <TextareaAutosize id={"title_" + this.props.page} placeholder={this.props.placeholder.title} defaultValue={this.props.contents.title}></TextareaAutosize>
          <TextareaAutosize id={"subtitle_" + this.props.page} placeholder={this.props.placeholder.subtitle} defaultValue={this.props.contents.subtitle}></TextareaAutosize>
          <TextareaAutosize id={"body_" + this.props.page} placeholder={this.props.placeholder.body} defaultValue={this.props.contents.body} onKeyDown={this.handleKeyDown}></TextareaAutosize>
        </div>
    );
  }
}

export default Contents;
