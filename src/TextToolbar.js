import React, { Component } from "react";
import uuid from "uuid";

import tools from "./utils/tools.js";

import "./assets/css/TextToolbar.css";

class Toolbar extends Component {
  state = {
    text_tooltip: null,
    text_highlight_options: null,
  }

  handleTooltip = (e) => {
    this.setState({
      text_tooltip: this.state.text_tooltip ? null
        : <div className="text_tooltip">
          <tools.Bold id="text_tools_bold" onClick={(e) => this.handleStyle(e)} />
          <tools.Italic id="text_tools_italic" onClick={(e) => this.handleStyle(e)} />
          <tools.Underline id="text_tools_underline" onClick={(e) => this.handleStyle(e)} />
          <tools.Strikethrough id="text_tools_strikethrough" onClick={(e) => this.handleStyle(e)} />
        </div>
    })
  }

  handleHighlight = (e) => {
    this.setState({
      text_highlight_options: this.state.text_highlight_options ? null
        : <div className="text_highlight_options">
            <button id="highlight_pink_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(255, 191, 181)')}></button>
            <button id="highlight_orange_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(247, 204, 98)')}></button>
            <button id="highlight_green_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(181, 220, 175)')}></button>
            <button id="highlight_blue_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(214, 232, 250)')}></button>
            <button id="highlight_purple_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(216, 195, 255)')}></button>
            <tools.Unhighlight id="text_tools_hiliteColor" onClick={(e) => this.handleStyle(e, 'rgb(255, 255, 255)')}/>
        </div>
    })
  }

  handleStyle = (e, color) => {
    document.execCommand(e.currentTarget.id.split("_")[2], false, color);
    this.props.setTextToolbar();
  }

  handleType = (e) => {
    const target = document.getElementById(this.props.cur_id);
    const type = target.getAttribute("type");

    if (e.currentTarget.id === `text_tools_${type}`) {
      target.setAttribute("type", "p");
      this.props.setContent('update', this.props.cur_id, target.getAttribute('placeholder'), target.innerHTML, "p", false);
    }
    else {
      console.log(e.currentTarget.id.split("_")[2])
      target.setAttribute("type", e.currentTarget.id.split("_")[2]);
      this.props.setContent('update', this.props.cur_id, target.getAttribute('placeholder'), target.innerHTML, e.currentTarget.id.split("_")[2], false);
    }
    this.props.setTextToolbar();
  };

  handleList = (e) => {
    // let idx = this.props.contents.findIndex(body => body.id === this.props.cur_id);
    const id = this.props.cur_id;
    const target = document.getElementById(id);
    const type = target.getAttribute('type');
    const list_type = e.currentTarget.id.split("_")[2];

    if (target.innerHTML.includes("</li>")) {
      var new_html = target.innerHTML.split(">")[2].split("</li")[0];
      if (target.innerHTML.includes(`</${list_type}>`)) {
        this.props.setContent('update', this.props.cur_id, "", new_html, type, false);
      }
      else {
        let div = document.createElement('div');
        let list = document.createElement(list_type);
        list.key = id;
        list.className = "list_item";
        list.setAttribute("indent", 1);
        list.setAttribute("start", 1)
        let item = document.createElement('li');
        item.key = id;
        item.id = `list_item_${uuid()}`
        item.innerHTML = new_html;
        list.appendChild(item);
        div.appendChild(list);

        this.props.setContent('update', this.props.cur_id, "", div.innerHTML, type, false);
      }
    }
    else {
      let div = document.createElement('div');
      let list = document.createElement(list_type);
      list.key = id;
      list.className = "list_item";
      list.setAttribute("indent", 1);
      list.setAttribute("start", 1)
      let item = document.createElement('li');
      item.key = id;
      item.id = `list_item_${uuid()}`
      item.innerHTML = target.innerHTML;
      list.appendChild(item);
      div.appendChild(list);
      
      this.props.setContent('update', this.props.cur_id, "", div.innerHTML, type, false);
    }

    this.props.setTextToolbar();
  }

  render() {
    return (
      <div className="text_toolbar" style={{ left: `calc(${this.props.x})`, top: `calc(${this.props.y})`}}>
        <tools.Text id="text_tools_text" onClick={(e) => this.handleTooltip(e)}/>
        {this.state.text_tooltip}
        <tools.Highlight id="text_tools_hiliteColor" onClick={(e) => this.handleHighlight(e)}/>
        {this.state.text_highlight_options}
        <tools.Header1 id="text_tools_h1" onClick={(e) => this.handleType(e)}/>
        <tools.Header2 id="text_tools_h2" onClick={(e) => this.handleType(e)}/>
        <tools.Header3 id="text_tools_h3" onClick={(e) => this.handleType(e)}/>
        <tools.Bulletlist id="text_tools_ul" onClick={(e) => this.handleList(e)}/>
        <tools.Numlist id="text_tools_ol" onClick={(e) => this.handleList(e)}/>
        <tools.Comment id="text_tools_comment"/>
      </div>
    );
  }
}

export default Toolbar;
