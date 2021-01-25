import React, { Component } from "react";
import InfoMsg from "./InfoMsg";

import tools from "../utils/tools";

import "../assets/css/Information.scss";

class Information extends Component {
  state = {
    show_functions: false,
  };

  componentDidMount() {
    console.log("Information Mounted...");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.isSelected(this.props.selected_files) !== this.state.show_functions) {
      this.setState({
        show_functions: !this.state.show_functions,
      });
    }

    if (prevState.selected_files !== this.state.selected_files) {
      console.log("showFunctions");
      this.showFunctions();
    }
  }

  isSelected = (selected_files) => {
    for (const key in selected_files) {
      if (selected_files[key]["is_selected"]) {
        return true;
      }
    }
    return false;
  }

  handleClick = (e) => {};

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
            {Object.values(this.props.selected_files).map((doc) =>
              doc.is_selected ? <InfoMsg key={doc.id} msg={doc.title} /> : null
            )}
            {this.state.show_functions ? (
              <div id="selected_files_functions">
                <span id="selected_files_download">모두 다운로드</span>
                <span id="selected_files_share">모두 공유</span>
                <span id="selected_files_etc">모두 더보기</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Information;
