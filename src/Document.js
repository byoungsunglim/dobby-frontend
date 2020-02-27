import React, { Component } from "react";

import Contents from './Contents.js';
import Index from './Index.js';

import "./assets/css/Document.css";

class Document extends Component {
  constructor(props) {
    super(props)

    this.setBlocks = this.setBlocks.bind(this)
  }

  state = {
    total_page: 1,
    document: [],
    placeholder: {
      title: '제목을 입력해주세요.',
      subtitle: '부제목을 입력해주세요.',
      body: '내용을 입력해주세요.'
    }
  };

  componentWillMount() {
    this.setBlocks();
  }

  componentDidUpdate() {
    switch (this.props.cmd) {
      case 'tools_pagination':
        this.setState({
          total_page: this.state.total_page + 1,
          document: this.state.document.concat(<hr/>).concat(<Contents contents={{title: "", subtitle: "", body: ""}} setContents={this.props.setContents} setPage={this.props.setPage} placeholder={this.state.placeholder} page={this.state.total_page}/>)
        })

        this.props.setCmd(null);
        break;
      // case 'setBlocks':
      //   console.log(this.props)
      //   break;
      default:
    }
  }

  setBlocks() {
    let document = [];

    for (let b = 0; b < this.props.index.length; b++) {
      let block = [];

      this.props.index[b].pages.forEach((p) => {
        block.push(<Contents contents={this.props.contents[p]} setContents={this.props.setContents} setPage={this.props.setPage} placeholder={this.state.placeholder} page={p} key={`contents_${p}`}/>);
      })
      
      document.push(
        <div className={`blocks_${b}`}>
          <b id={`idx_${b}`}>{this.props.index[b].title}</b>
          {block}
        </div>
      )
    }

    this.setState({
      document: document,
      total_page: this.props.contents.length,
      
    })
  }

  render() {
    return (
      <div className="document">
        <div className="title">
          <Contents contents={this.props.contents[0]} setContents={this.props.setContents} setPage={this.props.setPage} page={0} key={"contents_0"}/>
        </div>
        <Index {...this} {...this.props} key={"index"}/>
        {this.state.document}
      </div>
    );
  }
}

export default Document;
