import React, { Component } from "react";
import uuid from "uuid";

import Content from './Content';
import Contents from './Contents';

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
    if (this.props.document.length === 0) {
      let page = `page_${uuid()}`;
      this.props.setDocument('add', page);
    }
    this.renderPages();
  }

  renderPages() {
    let document = [];

    for (let i = 0; i < this.props.contents.length; i++) {
      let pages = [];

      for (let j = 0; j < this.props.contents[i].pages.length; j++) {
        let page = this.props.contents[i].pages[j];
        let idx = this.props.document.findIndex(content => content.page === page)
        pages.push(<Content content={this.props.document[idx].content} page={page} key={page} {...this.props}/>);
      }
      
      document.push(
        <div className="content_block" key={`content_${i}`}>
          <b id={`${this.props.contents[i].id}_title`}>{this.props.contents[i].title}</b>
          {this.props.contents[i].title.length > 0 ? pages : null} 
        </div>
      )
    }

    this.setState({
      document: document      
    })
  }

  render() {
    return (
      <div id="document">
        <div id="title">
          <Content content={this.props.document[0].content} page={this.props.document[0].page} key={this.props.document[0].page} {...this.props}/>
          <Contents {...this} {...this.props}/>
        </div>
        {this.state.document}
      </div>
    );
  }
}

export default Document;
