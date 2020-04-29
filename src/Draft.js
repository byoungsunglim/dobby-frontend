import React, { Component } from "react";
import Content from './Content';
import ContentEditable from "react-contenteditable";

import "./assets/css/Draft.css";

class Draft extends Component {
  handleChange = (e) => {
    this.props.setTitle(e.target.value);
  }

  render() {
    return (
      <div id="draft">
        <div id="header">
          <ContentEditable placeholder="문서 제목" html={this.props.title} onChange={(e) => this.handleChange(e)} spellCheck={false}/>
          <span>{this.props.updatedAt.toDate().toString().split(" ").slice(0, 5).join(" ")}</span>
        </div>
        {this.props.draft.map((page, idx) => (
          <Content content={page.content} page={page.id} key={page.id} {...this.props}/>
        ))}
      </div>
    );
  }
}

export default Draft;
