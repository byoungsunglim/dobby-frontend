import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import FileCard from "./FileCard";
import { makeCancelable } from '../utils/makeCancelable';
import { queryDB } from "../utils/queryDB";

import "../assets/css/Recents.scss";

class Recents extends Component {
  state = {
    recents: [],
  }

  componentDidMount() {
    console.log("Recents Mounted...");
    this.queryDB = makeCancelable(queryDB("get", "recents", this.props.user.email, 4));
    this.queryDB.promise.then((docs) => {
      console.log(docs);
      if (docs) {
        let files = [];
        for (let doc of docs) {
          files.push(<FileCard doc={doc}/>)
        }
        this.setState({
          recents: files,
        });
      }
      else {
        //TODO: handle where there is no recent files
      }
    });
  }

  componentWillUnmount() {
    console.log("Recents Unmounting...");
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
      <div id="recents">
        <span id="recents_title">최근 열어본 파일</span>
        <div id="files">
          {this.state.recents}
        </div>
      </div>
    )
  }
}

export default withRouter(Recents);
