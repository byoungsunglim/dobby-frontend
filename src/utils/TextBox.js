import React, { Component } from "react";
import ContentEditable from "react-contenteditable";

class TextBox extends Component {
  onChange = (e) => {
    this.props.setDraft('update', e.currentTarget.id, {
      html: e.target.value
    })
  }
  
  render() {
    return (
      <ContentEditable className="textbox" key={this.props.content.id} id={this.props.content.id}  html={this.props.content.html} level={this.props.content.level} style={this.props.content.style} disabled={this.props.content.disabled} onChange={(e) => this.onChange(e)}/>
    );
  }
}

export default TextBox;
