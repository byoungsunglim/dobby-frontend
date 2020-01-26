import React, { Component } from "react";

import Contents from './Contents.js';

import "./assets/css/Document.css";

class Document extends Component {
  state = {
    total_page: 1,
    document: []
  };

  componentWillMount() {
    let document = [];
    for (let page = 0; page < this.props.contents.length; page++) {
      if (page > 0) {
        document.push(<hr/>);
      }
      document.push(<Contents contents={this.props.contents[page]} setContents={this.props.setContents} page={page}/>);
    }

    this.setState({
      document: document,
      total_page: this.props.contents.length
    })
  }

  componentDidUpdate() {
    if (this.props.cmd === 'tools_pagination') {
      this.setState({
        total_page: this.state.total_page + 1,
        document: this.state.document.concat(<hr/>).concat(<Contents contents={{title: "", subtitle: "", body: ""}} setContents={this.props.setContents} page={this.state.total_page}/>)
      })

      this.props.setCmd(null);
    }
  }

  render() {
    return (
      <div className="document">
        {this.state.document}
      </div>
    );
  }
}

export default Document;
