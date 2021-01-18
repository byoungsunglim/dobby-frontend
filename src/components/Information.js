import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/Information.scss";

class Information extends Component {
  componentDidMount() {
    console.log("Information Mounted...");    
  }

  handleClick = (e) => {

  };

  render() {
    return (
      <div id="information" onClick={(e) => this.handleClick(e)}>
        <div id="information_header">
          <img alt="profile" src={this.props.user.profile_image} />
          <span>{this.props.user.nickname}</span>
        </div>
        <div id="information_body">
          <div className="info_section" id="todos">
            <span className="info_section_title">할 일</span>
            <hr />
          </div>
          <hr />
          <div className="info_section" id="histories">
            <span className="info_section_title">기록</span>
            <hr />
          </div>
          <hr />
          <div className="info_section" id="selected_files">
            <span className="info_section_title">선택 파일</span>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default Information;
