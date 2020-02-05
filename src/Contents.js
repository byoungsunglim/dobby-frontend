import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import "./assets/css/Contents.css";

class Contents extends Component {
  handleChange = (e) => {
    // const t = document.querySelectorAll('[id^=title]');
    // const s = document.querySelectorAll('[id^=subtitle]');
    // const b = document.querySelectorAll('[id^=body]');

    // let contents = [];

    // for (let page = 0; page < t.length; page++) {
    //   contents.push({page: page, title: t[page].value, subtitle: s[page].value, body: b[page].value});
    // }
    // console.log(e.target);

    let [id, page] = e.target.id.split("_");
    let data = {
      page: parseInt(page),
      value: {
        [id]: e.target.value
      }
    }

    this.props.setContents('update', data);
  }

  handleKeyDown = (e) => {
    // if (e.key === 'Tab') {
    //   e.preventDefault();
    //   let page = parseInt(e.target.id.substring(e.target.id.length));
    //   this.props.setContents()
    //   console.log(e.target);
    //   document.getElementById(e.target.id).innerText.replace('1234r53')
    // }
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
