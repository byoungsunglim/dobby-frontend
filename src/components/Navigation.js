import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import brand from "../utils/brand";
import tools from "../utils/tools";
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
      <button key="newFile" id="newFile" onClick={(e) => this.handleClick(e)}>
        <img src={tools.NewFile}/>
        <span>새로 만들기</span>
      </button>,
      <button key="uploadLocalFile" id="uploadLocalFile" onClick={(e) => this.handleClick(e)}>
        <img src={tools.UploadLocalFile}/>
        <span>로컬 파일 업로드</span>
      </button>,
      <button key="uploadLocalFolder" id="uploadLocalFolder" onClick={(e) => this.handleClick(e)}>
        <img src={tools.UploadLocalFolder}/>
        <span>로컬 폴더 업로드</span>
      </button>,
      <button key="syncGoogle" id="syncGoogle" onClick={(e) => this.handleClick(e)}>
        <img src={tools.GDrive}/>
        <span>Google Drive 연동하기</span>
      </button>,
      <button key="syncDropbox" id="syncDropbox" onClick={(e) => this.handleClick(e)}>
        <img src={tools.DBox}/>
        <span>Dropbox 연동하기</span>
      </button>,
      <hr></hr>,
      <button key="allFiles" id="allFiles" onClick={(e) => this.handleClick(e)}>
        <img src={tools.AllFiles}/>
        <span>모든 파일</span>
      </button>,
      <button key="sharedFiles" id="sharedFiles" onClick={(e) => this.handleClick(e)}>
        <img src={tools.SharedFiles}/>
        <span>공유 파일</span>
      </button>,
      <button key="importantFiles" id="importantFiles" onClick={(e) => this.handleClick(e)}>
        <img src={tools.ImportantFiles}/>
        <span>중요한 파일</span>
      </button>,
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
        <img id="logo" src={brand.Logo}/>
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