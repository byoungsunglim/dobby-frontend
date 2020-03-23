import React, { Component } from "react";
import uuid from "uuid";

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

  componentDidMount() {
    console.log("Document Mounted...")
    if (this.props.contents.length === 0) {
      let page = `page_${uuid()}`;
      this.props.setContents('add', page);
    }
    this.renderPages();
  }

  renderPages() {
    let document = [];

    for (let i = 0; i < this.props.index.length; i++) {
      let pages = [];

      if (this.props.index[i].pages) {
        this.props.index[i].pages.forEach((page) => {
          let idx = this.props.contents.findIndex(content => content.page === page)
          pages.push(<Contents contents={this.props.contents[idx]} setContents={this.props.setContents} setPage={this.props.setPage} page={page} key={page}/>);
        })
      }
      
      document.push(
        <div className="contents_block" key={`index_${i}`}>
          <b id={`${this.props.index[i].id}_title`}>{this.props.index[i].title}</b>
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
          <Contents contents={this.props.contents[0]} setContents={this.props.setContents} setPage={this.props.setPage} page={this.props.contents[0].page} key={this.props.contents[0].page}/>
          <Index {...this} {...this.props}/>
        </div>
        {this.state.document}
      </div>
    );
  }
}

export default Document;
