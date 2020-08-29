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
  }

  handleClick = (e) => {
    console.log(e.currentTarget.id);
    switch (e.currentTarget.id) {
      case 'logo':
        this.props.history.push("/");
        break;
      case "create":
        document.getElementById("createKinds").setAttribute('style', 'display:visible')
        // queryDB('put', 'doc', this.props.user.email).then((doc_id) => {
        //   // console.log(doc_id);
        //   this.props.history.push(`/doc/${doc_id}`)
        // });
        break;
      case "newPresentation":
        document.getElementById("presentationTypes").setAttribute('style', 'display:visible')
        document.getElementById("reportTypes").setAttribute('style', 'display:none')
        break;
      case "newReport":
        document.getElementById("reportTypes").setAttribute('style', 'display:visible')
        document.getElementById("presentationTypes").setAttribute('style', 'display:none')
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

  navigations = {
    home: [
      <button className="showHide" key="create" id="create" onClick={(e) => this.handleClick(e)}>
        <img alt="create" src={tools.Create}/>
        <span>새로 만들기</span>
      </button>,
      <div className="hideOnOut" key="createKinds" id="createKinds" onClick={(e) => this.handleClick(e)} style={{display: 'none'}}>
        <button key="newFolder" id="newFolder" onClick={(e) => this.handleClick(e)}>
          <img alt="folder" src={tools.Folder}/>
          <span>폴더</span>
        </button>
        <button className="showHide" key="newPresentation" id="newPresentation" onClick={(e) => this.handleClick(e)}>
          <img alt="presentation" src={tools.Presentation}/>
          <span>Docgabi 프리젠테이션</span>
          <div className="hideOnOut" id="presentationTypes" style={{display: 'none'}}>
            <button className="empty" onClick={(e) => this.handleClick(e)}>
              <span>빈 드래프트에서 작성</span>
            </button>
            <button className="template" onClick={(e) => this.handleClick(e)}>
              <span>템플릿으로 작성</span>
            </button>
          </div>
        </button>
        <button className="showHide" key="newReport" id="newReport" onClick={(e) => this.handleClick(e)}>
          <img alt="report" src={tools.Report}/>
          <span>Docgabi 보고서</span>
          <div className="hideOnOut" id="reportTypes" style={{display: 'none'}}>
            <button className="empty" onClick={(e) => this.handleClick(e)}>
              <span>빈 드래프트에서 작성</span>
            </button>
            <button className="template" onClick={(e) => this.handleClick(e)}>
              <span>템플릿으로 작성</span>
            </button>
          </div>
        </button>
        <hr></hr>
      </div>,
      <button key="uploadLocalFile" id="uploadLocalFile" onClick={(e) => this.handleClick(e)}>
        <img alt="local file" src={tools.LocalFile}/>
        <span>로컬 파일 업로드</span>
      </button>,
      <button key="uploadLocalFolder" id="uploadLocalFolder" onClick={(e) => this.handleClick(e)}>
        <img alt="local folder" src={tools.LocalFolder}/>
        <span>로컬 폴더 업로드</span>
      </button>,
      <button key="syncGoogle" id="syncGoogle" onClick={(e) => this.handleClick(e)}>
        <img alt="sync google" src={tools.GDrive}/>
        <span>Google Drive 연동하기</span>
      </button>,
      <button key="syncDropbox" id="syncDropbox" onClick={(e) => this.handleClick(e)}>
        <img alt="sync dropbox" src={tools.DBox}/>
        <span>Dropbox 연동하기</span>
      </button>,
      <hr></hr>,
      <button key="allFiles" id="allFiles" onClick={(e) => this.handleClick(e)}>
        <img alt="all files" src={tools.AllFiles}/>
        <span>모든 파일</span>
      </button>,
      <button key="sharedFiles" id="sharedFiles" onClick={(e) => this.handleClick(e)}>
        <img alt="shared files" src={tools.SharedFiles}/>
        <span>공유 파일</span>
      </button>,
      <button key="importantFiles" id="importantFiles" onClick={(e) => this.handleClick(e)}>
        <img alt="important files" src={tools.ImportantFiles}/>
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
        <img id="logo" src={brand.Logo} onClick={(e) => this.handleClick(e)}/>
        {this.navigations[this.props.view]}
      </div>
    );
  }
}

export default withRouter(Navigation);