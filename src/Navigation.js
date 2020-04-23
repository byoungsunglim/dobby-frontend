import React, { Component } from "react";
import Preview from "./Preview.js";

import "./assets/css/Navigation.css";

class Navigation extends Component {
  state = {
    navigation: null
  }



  componentDidMount() {
    this.setState({
      navigation: this.navigations[this.props.view]
    })
  }

  handleClick = () => {

  };

  navigations = {
    home: [
      <button id="newFileBtn" onClick={(e) => this.handleClick(e)}>신규 문서 작성</button>,
      <button id="allFilesBtn" onClick={(e) => this.handleClick(e)}><b>모든 파일</b></button>,
      <button id="sharedFilesBtn" onClick={(e) => this.handleClick(e)}><b>공유 파일</b></button>,
      <button id="importantFilesBtn" onClick={(e) => this.handleClick(e)}><b>중요한 파일</b></button>
    ]
  }

  render() {
    return (
      <div id="navigation">
        <div className="logo">
          <b>Docgabi</b>
        </div>
        {this.state.navigation}
      </div>
    );
  }
}

export default Navigation;
