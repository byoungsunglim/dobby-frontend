import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Modal from "./Modal";

import "../assets/css/Navigation.css";
import { queryDB } from "../utils/queryDB";
import { queryDrive } from "../utils/queryDrive";

class Navigation extends Component {
  state = {
    showModal: false
  }

  handleClick = (e) => {
    console.log(e.currentTarget.id);
    switch (e.currentTarget.id) {
      case 'logo':
        this.props.history.push("/");
        break;
      case "newFileBtn":
        queryDB('put', 'doc', this.props.user.email).then((doc_id) => {
          // console.log(doc_id);
          this.props.history.push(`/doc/${doc_id}`)
        });
        break;
      case "allFilesBtn":
        break;
      case "sharedFilesBtn":
        break;
      case "importantFilesBtn":
        break;
      case "importFilesBtn":
        this.setState({
          showModal: true
        });
        break;
      default:
    }
  };

  handleImport = (type) => {
    queryDrive("init", type, this.props.user.email).then(auth_url => {
      console.log(auth_url);
      if (auth_url) {
        window.open(auth_url, 'Sync Cloud Storage', 'width=auto, height=auto, toolbar=no, menubar=no, ');
      }
      else {
        
      }
    })
  }

  handleModal = () => {
    this.setState({
      showModal: false
    })
  }

  navigations = {
    home: [
      <button key="newFileBtn" id="newFileBtn" onClick={(e) => this.handleClick(e)}><span></span><b>신규 문서 작성</b></button>,
      <button key="allFilesBtn" id="allFilesBtn" onClick={(e) => this.handleClick(e)}><b>모든 파일</b></button>,
      <button key="sharedFilesBtn" id="sharedFilesBtn" onClick={(e) => this.handleClick(e)}><b>공유 파일</b></button>,
      <button key="importantFilesBtn" id="importantFilesBtn" onClick={(e) => this.handleClick(e)}><b>중요한 파일</b></button>,
      <button key="importFilesBtn" id="importFilesBtn" onClick={(e) => this.handleClick(e)}><b>불러오기</b></button>
    ],
    draft: [
      // <button key="designBtn" id="designBtn" onClick={() => this.props.setView()}>DESIGN</button>
    ],
    canvas: [
      // <button key="draftBtn" id="draftBtn" onClick={() => this.props.setView()}>DRAFT</button>
    ]
  }

  render() {
    return (
      <div id="navigation">
        <div id="logo" onClick={(e) => this.handleClick(e)}>
          <b>Docgabi</b>
        </div>
        {this.navigations[this.props.view]}
        {this.state.showModal ? 
          <Modal handleImport={this.handleImport} handleModal={this.handleModal}/>
          : null
        }
      </div>
    );
  }
}

export default withRouter(Navigation);