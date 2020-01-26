import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import "./assets/css/Contents.css";

class Contents extends Component {
  handleChange = () => {
    const t = document.querySelectorAll('[id^=title]');
    const s = document.querySelectorAll('[id^=subtitle]');
    const b = document.querySelectorAll('[id^=body]');

    this.props.setContents({title: t[this.props.page].value, subtitle: s[this.props.page].value, body: b[this.props.page].value}, this.props.page);
  }

  render() {
    return (
        <div className={"contents" + this.props.page} onChange={this.handleChange}>
          <TextareaAutosize id={"title" + this.props.page} placeholder="Title" defaultValue={this.props.contents.title}></TextareaAutosize>
          <TextareaAutosize id={"subtitle" + this.props.page} placeholder="Subtitle" defaultValue={this.props.contents.subtitle}></TextareaAutosize>
          <TextareaAutosize id={"body" + this.props.page} placeholder="Body" defaultValue={this.props.contents.body}></TextareaAutosize>
        </div>
    );
  }
}

export default Contents;
