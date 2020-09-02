import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import FileList from "./FileList";
import { makeCancelable } from '../utils/makeCancelable';
import { queryDB } from "../utils/queryDB";
import { queryDrive } from "../utils/queryDrive";

import "../assets/css/Entries.scss";

class Entries extends Component {
  state = {
    recent_filess: [],
    gFiles: [],
    dFiles: []
  }

  componentDidMount() {
    console.log("Entries Mounted...");
    this.queryDB = makeCancelable(queryDB("get", "recents", this.props.user.email, 5));
    this.queryDB.promise.then((docs) => {
      console.log(docs);
      if (docs) {
        let files = [];
        for (let doc of docs) {
          files.push(<FileList doc={doc}/>)
        }
        this.setState({
          recents: files,
        });
      }
      else {
        //TODO: handle where there is no recent files
      }
    });

      // queryDrive("get", null, this.props.user.email).then(result => {
      //   let gFiles = [];
      //   let dFiles = [];

      //   for (let [uid, value] of Object.entries(result.gDrive)) {
      //     for (let item of value.items) {
      //       gFiles.push(
      //         <div className="doc" key={item.id} id={item.id} onClick={() => window.open(item.alternateLink)}>
      //           <div className="thumbnail">
      //             <img src={item.thumbnailLink || item.iconLink}></img>
      //           </div>
      //           <span></span>
      //           <div className="info" style={{textAlign: "center"}}>
      //             <span>{item.title}</span><br/>
      //           </div>
      //         </div>
      //       )
      //     }
      //   }

      //   for (let [uid, value] of Object.entries(result.dBox)) {
      //     for (let item of value.items) {
      //       gFiles.push(
      //         <div className="doc" key={item.id} id={item.id}>
      //           <div className="thumbnail">
      //             <img></img>
      //           </div>
      //           <span></span>
      //           <div className="info" style={{textAlign: "center"}}>
      //             <span>{item.name}</span><br/>
      //           </div>
      //         </div>
      //       )
      //     }
      //   }

      //   this.setState({
      //     gFiles: gFiles,
      //     dFiles: dFiles
      //   })
      // })
    // });
  }

  componentWillUnmount() {
    console.log("Entries Unmounting...");
    this.queryDB.cancel();
  }

  handleClick = (e) => {
    // console.log(e.currentTarget.id);
    const id = e.currentTarget.id;
    if (id === "newFile") {
      queryDB("put", "doc", this.props.user.email).then((doc_id) => {
        this.props.history.push(`/doc/${doc_id}`)
      })
    }
    else {
      this.props.history.push(`/doc/${id}`)
    }
  }

  render() {
    return (
      <div id="entries">
        <div id="entries_header">
          <span id="entries_title">파일/폴더</span>
        </div>
        <div id="entries_body">
          {this.state.recents}
        </div>
      </div>
    )
  }
}

export default withRouter(Entries);
