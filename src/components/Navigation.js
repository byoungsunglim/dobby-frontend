import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import brand from "../utils/brand";
import tools from "../utils/tools";
import Modal from "./Modal";

import { queryDB } from "../utils/queryDB";
import { queryDrive } from "../utils/queryDrive";

import "../assets/css/Navigation.scss";

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
        break;
      case "newPresentation":
        document.getElementById("presentationTypes").setAttribute('style', 'display:visible')
        document.getElementById("reportTypes").setAttribute('style', 'display:none')
        break;
      case "newPresentation_empty":
        queryDB('put', 'doc', this.props.user.email).then((doc_id) => {
          // console.log(doc_id);
          this.props.history.push(`/doc/${doc_id}`)
        });
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
      <div className="showHide" key="create" id="create" onClick={(e) => this.handleClick(e)}>
        <img alt="create" key="create_img" src={tools.Create}/>
        <span>새로 만들기</span>
      </div>,
      <div className="hideOnOut" key="createKinds" id="createKinds" onClick={(e) => this.handleClick(e)} style={{display: 'none'}}>
        <div className="onHover1 navBtn" key="newFolder" id="newFolder" onClick={(e) => this.handleClick(e)}>
          <span className="hoverEffect1" key="hoverEffect1"/>
          <img className="navBtnLogo" alt="folder" key="folder" src={tools.Folder}/>
          <span className="navBtnTitle">폴더</span>
        </div>
        <div className="onHover1 navBtn showHide" key="newPresentation" id="newPresentation" onClick={(e) => this.handleClick(e)}>
          <span className="hoverEffect1" key="hoverEffect11"/>
          <img className="navBtnLogo" alt="presentation" key="presentation" src={tools.Presentation}/>
          <span className="navBtnTitle">Docgabi 프리젠테이션</span>
          <img alt="arrow" className="arrow" key="arrow" src={tools.Arrow}/>
          <div className="hideOnOut" id="presentationTypes" key="presentationTypes" style={{display: 'none'}}>
            <div className="onHover2 empty" id="newPresentation_empty" key="newPresentation_empty" onClick={(e) => this.handleClick(e)}>
              <span className="hoverEffect2" key="hoverEffect22"/>
              <span className="typesTitle">빈 드래프트에서 작성</span>
            </div>
            <div className="onHover2 template" id="newPresentation_template" key="newPresentation_template" onClick={(e) => this.handleClick(e)}>
              <span className="hoverEffect2" key="hoverEffect22"/>
              <span className="typesTitle">템플릿으로 작성</span>
            </div>
          </div>
        </div>
        <div className="onHover1 navBtn showHide" key="newReport" id="newReport" onClick={(e) => this.handleClick(e)}>
          <span className="hoverEffect1" key="hoverEffect111"/>
          <img className="navBtnLogo" alt="report" key="report" src={tools.Report}/>
          <span className="navBtnTitle">Docgabi 보고서</span>
          <img alt="arrow" className="arrow" key="arrow" src={tools.Arrow}/>
          <div className="hideOnOut" id="reportTypes" key="reportTypes" style={{display: 'none'}}>
            <div className="onHover2 empty" id="newReport_empty" key="newReport_empty" onClick={(e) => this.handleClick(e)}>
              <span className="hoverEffect2" key="hoverEffect222"/>
              <span className="typesTitle">빈 드래프트에서 작성</span>
            </div>
            <div className="onHover2 template" id="newReport_template" key="newReport_template" onClick={(e) => this.handleClick(e)}>
              <span className="hoverEffect2" key="hoverEffect222"/>
              <span className="typesTitle">템플릿으로 작성</span>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>,
      <div className="onHover1 navBtn" key="uploadLocalFile" id="uploadLocalFile" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="local file" src={tools.LocalFile}/>
        <span className="navBtnTitle">로컬 파일 업로드</span>
      </div>,
      <div className="onHover1 navBtn" key="uploadLocalFolder" id="uploadLocalFolder" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="local folder" src={tools.LocalFolder}/>
        <span className="navBtnTitle">로컬 폴더 업로드</span>
      </div>,
      <div className="onHover1 navBtn" key="syncGoogle" id="syncGoogle" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="sync google" src={tools.GDrive}/>
        <span className="navBtnTitle">Google Drive 연동하기</span>
      </div>,
      <div className="onHover1 navBtn" key="syncDropbox" id="syncDropbox" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="sync dropbox" src={tools.DBox}/>
        <span className="navBtnTitle">Dropbox 연동하기</span>
      </div>,
      <hr key="nav_hr"></hr>,
      <div className="onHover1 navBtn" key="allFiles" id="allFiles" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="all files" src={tools.AllFiles}/>
        <span className="navBtnTitle">모든 파일</span>
      </div>,
      <div className="onHover1 navBtn" key="sharedFiles" id="sharedFiles" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="shared files" src={tools.SharedFiles}/>
        <span className="navBtnTitle">공유 파일</span>
      </div>,
      <div className="onHover1 navBtn" key="importantFiles" id="importantFiles" onClick={(e) => this.handleClick(e)}>
        <span className="hoverEffect1"/>
        <img className="navBtnLogo" alt="important files" src={tools.ImportantFiles}/>
        <span className="navBtnTitle">중요한 파일</span>
      </div>,
    ],
    draft: [
      // <div key="designBtn" id="designBtn" onClick={() => this.props.setView()}>DESIGN</div>
    ],
    canvas: [
      // <div key="draftBtn" id="draftBtn" onClick={() => this.props.setView()}>DRAFT</div>
    ]
  }

  render() {
    return (
      <div id="navigation">
        <img id="logo" alt="navLogo" src={brand.Logo} onClick={(e) => this.handleClick(e)}/>
        <div id="navigation_body">
          {this.navigations[this.props.view]}
        </div>
        <div id="help">
          <span>도움말</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);