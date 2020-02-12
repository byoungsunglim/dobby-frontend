import React, { Component } from "react";

import { getIndexTitle } from './utils/getIndexTitle.js'; 
import { getPropById } from './utils/getPropById.js';

import "./assets/css/Index.css";

class Index extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     index: null,
  //   };
  // }

  state = {
    index: null,
  }

  componentWillMount() {
    let index = [];
    for (let idx = 0; idx < this.props.index.length; idx++) {
      let id = this.props.index[idx].id;
      let title = this.props.index[idx].title.replace(id+".", "").trim();
      let index_title = getIndexTitle(id, title);
      index.push(<input id={`index_title_${id}`} defaultValue={index_title} autoFocus></input>)
    }
    
    this.setState({
      index: index
    })
  }

  addIndex = (id, title) => {
    this.setState({
      index: this.state.index.concat(<input id={`index_title_${id}`} defaultValue={title} autoFocus></input>)
    })
  }

  handleChange = (e) => {
    const t = e.target.id.split("_");
    let id = t[2];
    let data = {
      title: e.target.value
    }

    let pages = getPropById(id, 'pages', this.props.index);
    
    if (pages.length === 0)
    { 
      data.pages = [this.props.contents.length];
      this.props.setContents('add', {title: "", subtitle: "", body: ""})
    }

    this.props.setIndex('update', id, data);
  }

  handleKeyDown = (e) => {
    let cur_id = `${e.target.id}`.substring(12, e.target.id.length);
    switch (e.key) {
      case 'Enter':
        let levels = cur_id.split(".");
        let level = levels[levels.length - 1];
        let next_id = cur_id.substring(0, cur_id.length - level.length) + (parseInt(level) + 1).toString();
        // let next_id = `${e.target.id}`.substring(12, e.target.id.length); + (parseInt(e.target.id[e.target.id.length -1]) + 1).toString();

        try {
          document.getElementById(`index_title_${cur_id}`).nextSibling.focus();
          // document.getElementById(`index_title_${next_id}`).focus()
        }
        catch {
          let index_title = getIndexTitle(next_id, "");
          this.addIndex(next_id, index_title);
          // this.setState({
          //   index: this.state.index.concat(<input id={`index_title_${next_id}`} defaultValue={index_title} autoFocus></input>)
          // })
          this.props.setIndex("add", next_id, {title: "", pages: []});
          // this.props.setBlocks();
        }
        break;
      case 'Tab':
        e.preventDefault();
        
        console.log(cur_id);
        let value = "";
        if (e.target.value.includes(cur_id)) {
          value = e.target.value.split(cur_id + '.')[1].trim();
        }

        if (cur_id !== "1" && value.length === 0) {
          let prev_id = document.getElementById(`index_title_${cur_id}`).previousSibling.id;
          prev_id = prev_id.substring(12, prev_id.length);
          console.log(prev_id);
          let next_id = prev_id + '.1'
          let index_title = getIndexTitle(next_id, "");
   
          // this.setState({
          //   index: this.state.index.filter(idx => idx.props.id !== `index_title_${cur_id}`).concat(<input id={`index_title_${next_id}`} defaultValue={index_title} autoFocus></input>)
          // })
          this.setState({
            index: this.state.index.filter(idx => idx.props.id !== `index_title_${cur_id}`)
          }, () => this.addIndex(next_id, index_title))

   
          // this.setState({
          //   index: this.state.index
          // })
          // console.log(this.state.index);
          this.props.setIndex("update", cur_id, {id: next_id, title: "", pages: []});
          // this.props.setIndex("add", next_id, {title: "", pages: []});
          // this.props.setBlocks();
        }
        else {
          // var val = e.target.value,
          //       start = e.target.selectionStart,
          //       end = e.target.selectionEnd;
          // console.log(val, start, end);
          // // set textarea value to: text before caret + tab + text after caret
          // e.target.value = val.substring(0, start) + '\t' + val.substring(end);

          // // put caret at right position again
          // e.target.selectionStart = e.target.selectionEnd = start + 1;

          // console.log(e.target.value.concat("\tabc"));
          // this.props.setIndex("update", cur_id, {title: e.target.value.concat("\t")});
          // console.log(this.props.index);
          e.target.value += '\t';
        }
        break;
      case 'Backspace':        
        if (e.target.value.length === 0) {
          try {
            e.preventDefault();
            document.getElementById(`index_title_${cur_id}`).previousSibling.focus();
            let pages = getPropById(cur_id, 'pages', this.props.index);
            pages.forEach((page) => {
              this.props.setContents("remove", {page: page});
            })
            this.props.setIndex("remove", cur_id, );
         
            e.unbind();
          }
          catch {
            break;
          }
        }
        break;
      default:
        this.props.setBlocks();
    }
  }

  render() {
    return (
        <div className="index" onChange={this.handleChange} onKeyDown={this.handleKeyDown}>
          <b style={{fontSize: '14pt'}}>목차</b>
          <div className="index_title">
            {this.state.index}
          </div>  
        </div>
    );
  }
}

export default Index;