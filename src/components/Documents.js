import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { makeCancelable } from '../utils/makeCancelable';
import { queryDB } from "../utils/queryDB";
import { queryDrive } from "../utils/queryDrive";

import "../assets/css/Documents.css";

class Documents extends Component {
  state = {
    docs: []
  }

  componentDidMount() {
    console.log("Documents Mounted...");
    this.queryDB = makeCancelable(queryDB("get", "docs", this.props.user.email));
    this.queryDB.promise.then((docs) => {
      if (docs) {
        let boxes = [];
        for (let doc of docs) {
          boxes.push(this.docBox(doc.id, doc.title, doc.thumbnail, doc.owner, doc.shared, doc.updatedAt.toDate().toString().split(" ").slice(0, 4).join(" ")))
        }
        this.setState({
          docs: boxes,
        });
      }
      else {
        this.setState({
          docs: [this.docBox("newFile", "새로운 문서 만들기", null, null, null, null)]
        })
      }
    });
  }

  componentWillUnmount() {
    console.log("Documents Unmounting...");
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

  docBox = (id, title, thumbnail, owner, shared, updatedAt) => {
    if (id === "newFile") {
      return (
        <div className="doc" key={id} id={id} onClick={(e) => this.handleClick(e)}>
          <div className="thumbnail">
            <img src={thumbnail}></img>
          </div>
          <span></span>
          <div className="info" style={{textAlign: "center"}}>
            <h3>{title}</h3>
          </div>
        </div>
      )
    }
    return (
      <div className="doc" key={id} id={id} onClick={(e) => this.handleClick(e)}>
        <div className="thumbnail">
          <img src={thumbnail}></img>
        </div>
        <span></span>
        <div className="info">
          <span>{title}</span><br/>
          <span>owner : {owner}</span><br/>
          <span>shared : {shared}</span><br/>
          <span>modified : {updatedAt}</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="docs">
        {this.state.docs}
      </div>
    )
  }
}

export default withRouter(Documents);
