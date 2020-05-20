import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/TextToolbar.css";

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
    const level = target.getAttribute("level");
    const new_level = e.currentTarget.id.substring(e.currentTarget.id.length - 1);

    if (level === new_level) {
      target.setAttribute('level', 4);
      this.props.setDraft('update', this.props.cur_id, {level: 4});
    }
    else {
      target.setAttribute('level', parseInt(new_level));
      this.props.setDraft('update', this.props.cur_id, {level: parseInt(new_level)});
    }

    this.props.setTextToolbar();
  };

  handleList = (e) => {
    const idx = this.props.draft.findIndex(content => content.id === this.props.cur_id);
    const type = this.props.draft[idx].type;
    const new_type = e.currentTarget.id.split("_")[2]

    if (type === new_type) {
      let draft = this.props.draft;
      draft[idx].type = 'h';
      draft[idx].indent = null;
      draft[idx].start = null;
      this.props.orderContent(draft, idx);
    }
    else {
      let draft = this.props.draft;
      draft[idx].type = new_type;
      draft[idx].indent = this.props.draft[idx].indent || 1;
      draft[idx].start = 1;
      this.props.orderContent(draft, idx);
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
