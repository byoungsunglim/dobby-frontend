import React, { Component } from "react";

import tools from "./utils/tools.js";

import "./assets/css/TextToolbar.css";

class Toolbar extends Component {
  state = {
    text_tooltip: null,
  }

  handleTooltip = (e) => {
    this.setState({
      text_tooltip: this.state.text_tooltip ? null
      : <div className="text_tooltip">
          <tools.Bold id="text_tools_bold" onClick={(e) => this.handleStyle(e)}/>
          <tools.Italic id="text_tools_italic" onClick={(e) => this.handleStyle(e)}/>
          <tools.Underline id="text_tools_underline" onClick={(e) => this.handleStyle(e)}/>
          <tools.Strikethrough id="text_tools_strikethrough" onClick={(e) => this.handleStyle(e)}/>
        </div>
    })
  }

  handleStyle = (e) => {
    const { preText, postText, selText } = this.props;

    console.log("style", e.currentTarget)

    if (e.currentTarget.id === "text_tools_bold") {
      if (selText.includes("<b>")) {
        let data = {
          [this.props.cur_id]: preText + selText.replace(/<b>|<\/b>/g, "") + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.replace(/<b>|<\/b>/g, "") + postText;
      }
      else {
        let data = {
          [this.props.cur_id]: preText + selText.bold() + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.bold() + postText;
      }
    }
    else if (e.currentTarget.id === "text_tools_strikethrough") {
      if (selText.includes("<strike>")) {
        let data = {
          [this.props.cur_id]: preText + selText.replace(/<strike>|<\/strike>/g, "") + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.replace(/<strike>|<\/strike>/g, "") + postText;
      }
      else {
        let data = {
          [this.props.cur_id]: preText + selText.strike() + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.strike() + postText;
      }
    }
    else if (e.currentTarget.id === "text_tools_highlight") {
      if (selText.includes(`<span id="highlight">`)) {
        let data = {
          [this.props.cur_id]: preText + selText.replace(/<span id="highlight">|<\/span>/g, "") + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + selText.replace(/<span id="highlight">|<\/span>/g, "") + postText;
      }
      else {
        let data = {
          [this.props.cur_id]: preText + `<span id='highlight'>${selText}</span>` + postText,
          content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
        }  
        this.props.setContents('update', this.props.page, data);
        document.getElementById(this.props.cur_id).innerHTML = preText + `<span id='highlight'>${selText}</span>` + postText;
      }
    }
  }
  
  handleType = (e) => {
    let selected_text = document.getElementById(this.props.cur_id);
    
    if (e.currentTarget.id === `tools_${selected_text.getAttribute("type")}`) {
      selected_text.setAttribute("type", "p");
    }
    else if (e.currentTarget.id === "tools_h1") {
      selected_text.setAttribute("type", "h1");
    }
    else if (e.currentTarget.id === "tools_h2") {
      selected_text.setAttribute("type", "h2");
    }
  };

  render() {
    return (
      <div className="text_toolbar" style={{left: `calc(${this.props.x})`, top: `calc(${this.props.y})`}}>
        <tools.Text id="text_tools_text" onClick={(e) => this.handleTooltip(e)}/>
        {this.state.text_tooltip}
        <tools.Highlight id="text_tools_highlight" onClick={(e) => this.handleStyle(e)}/>
        <tools.Header1 id="text_tools_h1" onClick={(e) => this.handleType(e)}/>
        <tools.Header2 id="text_tools_h2" onClick={(e) => this.handleType(e)}/>
        <tools.Bulletlist id="text_tools_bulletlist" />
        <tools.Comment id="text_tools_comment" />
      </div>
    );
  }
}

export default Toolbar;
