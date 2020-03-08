import React, { Component } from "react";

import { getPropById } from './utils/getPropById.js';
import { replaceAll } from './utils/replaceAll.js'; 

import "./assets/css/Index.css";

class Index extends Component {
  state = {
    index: [],
    placeholder: ['배경', '본론', '결론']
  }

  componentWillMount() {
    for (let idx = 0; idx < this.props.index.length; idx++) {
      let id = this.props.index[idx].id;
      let title = this.props.index[idx].title;

      this.addIndex(id, title);
    }
  }

  addIndex = (id, title) => {
    this.setState({
      index: this.state.index.concat(
      <li id={`index_list_item_${id}`} value={id+'. '} indent={replaceAll(id, ".", "").length}>
        <input id={id} defaultValue={title} placeholder={this.state.placeholder.length >= parseInt(id) ? this.state.placeholder[parseInt(id) - 1] : ''} autoFocus></input>
      </li>
    )
    })
  }

  handleChange = (e) => {
    let id = e.target.id;
    let data = {
      title: e.target.value
    }
    let pages = getPropById(id, 'pages', this.props.index);
    
    if (pages.length === 0)
    { 
      data.pages = [this.props.contents.length];
      this.props.setContents('add', null, null)
      this.props.setDesign('add', null, null) //TODO: Integration with setContents
    }

    this.props.setIndex('update', id, data);
  }

  handleKeyDown = (e) => {
    let cur_id = e.target.id;
    switch (e.key) {
      case 'Enter':
        let levels = cur_id.split(".");
        let level = levels[levels.length - 1];
        let next_id = cur_id.substring(0, cur_id.length - level.length) + (parseInt(level) + 1).toString();

        try {
          document.getElementById(`index_list_item_${cur_id}`).nextSibling.childNodes[0].focus();
        }
        catch {
          this.addIndex(next_id, "");
          this.props.setIndex("add", next_id, {title: "", pages: []});
        }

        this.props.renderPages();
        break;
      case 'Tab':
        e.preventDefault();
        
        if (cur_id !== "1" && e.target.value.length === 0 && e.target.id.length < 9) {
          let prev_id = document.getElementById(`index_list_item_${cur_id}`).previousSibling.childNodes[0].id;
          let next_id = prev_id + '.1';
          this.setState({
            index: this.state.index.filter(idx => idx.props.id !== `index_list_item_${cur_id}`)
          }, () => this.addIndex(next_id, ""))

          this.props.setIndex("update", cur_id, {id: next_id, title: "", pages: []});
        }
        else {
          e.target.value += '\t';
        }

        this.props.renderPages();
        break;
      case 'Backspace':        
        if (e.target.value.length === 0) {
          try {
            e.preventDefault();
            document.getElementById(`index_list_item_${cur_id}`).previousSibling.childNodes[0].focus();
            let pages = getPropById(cur_id, 'pages', this.props.index);
            pages.forEach((page) => {
              this.props.setContents("remove", page, null);
              this.props.setDesign("remove", page, null); //TODO: Integration with setContents
            })
            this.props.setIndex("remove", cur_id, );
            this.setState({
              index: this.state.index.filter(idx => idx.props.id !== `index_list_item_${cur_id}`)
            });
            e.unbind();
          }
          catch {
          }
        }

        this.props.renderPages();
        break;
      default:
        this.props.renderPages();
    }
  }

  render() {
    return (
        <div className="index" onChange={this.handleChange} onKeyDown={this.handleKeyDown}>
          <span style={{fontSize: '16pt'}}>*목차를 먼저 적어주시면, 페이지가 자동으로 생성됩니다.</span>
          <ol className="index_list">
            {this.state.index}
          </ol>
        </div>
    );
  }
}

export default Index;