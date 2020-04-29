import React, { Component } from 'react';
import { queryDB } from "./utils/queryDB";
import uuid from "uuid";

import "./assets/css/Main.css";

class Main extends Component {
  state = {
    main: null,
    docs: []
  }

  componentDidMount() {
    console.log("Main Mounted...");
    let docs = queryDB("get", "docs", this.props.user.email);
    this.setState({
      docs: docs
    })
  }



  createDoc = (
    <div className="doc">
      <div className="thumbnail">
        <b>새로운 문서 만들기</b>
      </div>
      <div className="info">

      </div>
    </div>
  );

  render() {
    return (
      <div id="main">
        <div id="main_header">
          <b>HOME</b>
        </div>
      </div>
    );
  }
}

export default Main;
