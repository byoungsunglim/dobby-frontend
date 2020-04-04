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
  };

  handleList = (e) => {
    // let idx = this.props.contents.findIndex(body => body.id === this.props.cur_id);
    const id = this.props.cur_id;
    const target = document.getElementById(id);
    if (target.innerHTML.includes("<li>")) {
      target.innerHTML = target.innerHTML.split("<li>")[1].split("</li>")[0];
    }
    else {
      let prev_target = target.previousElementSibling;
      const list_type = e.currentTarget.id.split("_")[2];
      var list = document.createElement(list_type);
      list.key = id;
      list.className = "list_item";
      list.setAttribute("indent", prev_target.getAttribute("indent") || 1);
      list.setAttribute("start", prev_target.getAttribute("start") || 1)
      var item = document.createElement('li');
      item.key = id;
      item.id = `list_item_${uuid()}`
      // var span = document.createElement('span');
      item.innerHTML = target.innerHTML;
      // item.appendChild(span);
      list.appendChild(item);
      target.setAttribute('type', 'p');
      target.innerHTML = '';
      target.appendChild(list);

      this.props.setContent('update', this.props.cur_id, "", target.innerHTML, 'p', false);
    }
  }

  handleBlur = (e) => {
    console.log("blur")
  }

  render() {
    return (
      <div className="text_toolbar" style={{ left: `calc(${this.props.x})`, top: `calc(${this.props.y})`}} onBlur={(e) => this.handleBlur(e)}>
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
