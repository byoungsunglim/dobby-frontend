import React, { Component } from "react";

import Contents from './Contents.js';
import Index from './Index.js';

import "./assets/css/Document.css";

class Document extends Component {
  constructor(props) {
    super(props)

    this.renderPages = this.renderPages.bind(this);
  }

  state = {
    document: [],
  };

  componentWillMount() {
    this.renderPages();
  }

  renderPages() {
    let document = [];

    for (let i = 0; i < this.props.index.length; i++) {
      let pages = [];

      this.props.index[i].pages.forEach((p) => {
        pages.push(<Contents contents={this.props.contents[p]} setContents={this.props.setContents} setPage={this.props.setPage} page={p} key={`contents_${p}`}/>);
      })
      
      document.push(
        <div className={`idx_${i}`}>
          <b id={`idx_title_${i}`}>{this.props.index[i].title}</b>
          {pages}
        </div>
      )
    }

    this.setState({
      document: document      
    })
  }

  render() {
    return (
      <div className="document">
        <div className="title">
          <Contents contents={this.props.contents[0]} setContents={this.props.setContents} setPage={this.props.setPage} page={0} key={"contents_0"}/>
          <Index {...this} {...this.props} key={"index"}/>
        </div>
        {this.state.document}
      </div>
    );
  }
}

export default Document;
