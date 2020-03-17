import React, { Component } from "react";

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
    // const { preText, selText, postText } = this.props;

    // let new_html = getTextStyle(e.currentTarget.id, preText, selText, postText);
    // console.log("new_html", new_html);
    // let data = {
    //   [this.props.cur_id]: new_html
    // }
    // this.props.setContents('update', this.props.page, data);
    // document.getElementById(this.props.cur_id).innerHTML = new_html;
    document.execCommand(e.currentTarget.id.split("_")[2], false, color);
  }

  handleType = (e) => {
    let selected_text = document.getElementById(this.props.cur_id);
    let type = selected_text.getAttribute("type");

    if (type !== 'title') {
      if (e.currentTarget.id === `text_tools_${type}`) {
        selected_text.setAttribute("type", "p");
      }
      else {
        console.log(e.currentTarget.id.split("_")[2])
        selected_text.setAttribute("type", e.currentTarget.id.split("_")[2]);
      }
    }
    else {
      alert("문서 제목 입력란입니다.");
    }
  };

  handleList = (e) => {
    let target = document.getElementById(this.props.cur_id);
    if (target.getAttribute('type') !== 'title') {
      if (target.innerHTML.includes("<li>")) {
        target.innerHTML = target.innerHTML.split("<li>")[1].split("</li>")[0];
      }
      else {
        let prev_target = target.previousElementSibling;
        target.setAttribute('type', 'p');
        const list_type = e.currentTarget.id.split("_")[2];
        var list = document.createElement(list_type);
        list.className = `list_${list_type}`;
        list.setAttribute("indent", prev_target.getAttribute("indent") ? prev_target.getAttribute("indent") : 1);
        list.setAttribute("start", prev_target.getAttribute("start") ? parseInt(prev_target.getAttribute("start")) + 1 : 1)
        var item = document.createElement('li');
        item.innerHTML = target.innerHTML;
        
        list.appendChild(item);
  
        target.innerHTML = '';
        target.appendChild(list);
        console.log(target);
      }
    }
    else {
      alert("문서 제목 입력란입니다.");
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
