import React, { Component } from "react";

import tools from "./utils/tools.js";

import "./assets/css/TextToolbar.css";

class Toolbar extends Component {
  handleStyle = (e) => {
    const { preText, postText, selText } = this.props;

    if (e.target.id === "tools_bold") {
      if (selText.includes("<b>")) {
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.replace(/<b>|<\/b>/g, "") + postText;
      }
      else {
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.bold() + postText;
      }
    }
    else if (e.target.id === "tools_strikethrough") {
      if (selText.includes("<strike>")) {
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.replace(/<strike>|<\/strike>/g, "") + postText;
      }
      else {
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.strike() + postText;
      }
    }
    else if (e.target.id === "tools_highlight") {
      // document.getElementById(this.props.cur_id).innerHTML = html.substring(0, idx) + html.substring(idx).replace(text, text.strike());
    }
  }
  
  handleType = (e) => {
    let selected_text = document.getElementById(this.props.cur_id);
    
    if (e.target.id === `tools_${selected_text.getAttribute("type")}`) {
      selected_text.setAttribute("type", "p");
    }
    else if (e.target.id === "tools_h1") {
      selected_text.setAttribute("type", "h1");
    }
    else if (e.target.id === "tools_h2") {
      selected_text.setAttribute("type", "h2");
    }
  };



  render() {
    return (
      <div className="text_toolbar" style={{left: `calc(${this.props.x})`, top: `calc(${this.props.y})`}}>
        <tools.Bold id="tools_bold" onClick={(e) => this.handleStyle(e)}/>
        <tools.Strikethrough id="tools_strikethrough" onClick={(e) => this.handleStyle(e)}/>
        <tools.Highlight id="tools_highlight" onClick={(e) => this.handleStyle(e)}/>
        <tools.Header1 id="tools_h1" onClick={(e) => this.handleType(e)}/>
        <tools.Header2 id="tools_h2" onClick={(e) => this.handleType(e)}/>
        <tools.Bulletlist id="tools_bulletlist" />
        <tools.Comment id="tools_comment" />
      </div>
    );
  }
}

export default Toolbar;
