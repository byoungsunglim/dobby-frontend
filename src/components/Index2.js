import React, { Component } from "react";

import { getPropById } from '../utils/getPropById';

import "./assets/css/Index.css";

class Index extends Component {
  state = {
    index: [],
    placeholder: ['배경', '본론', '결론']
  }

  componentDidMount() {
    let index = [];
    for (let idx = 0; idx < this.props.index.length; idx++) {
      let id = this.props.index[idx].id;
      let title = this.props.index[idx].title;

      index.push(this.addIndex(id, title, true));
    }
    this.setState({
      index: index
    })
  }

  addIndex = (id, title, init, insert) => {
    if (insert) {
      let ref_id = insert.id.substring(0, insert.id.lastIndexOf(".") === -1 ? insert.id.length : insert.id.lastIndexOf("."));
      console.log(insert.id.lastIndexOf("."), ref_id);
      let nodes = document.querySelectorAll(`[id^="index_list_item_${ref_id}"]`);
      console.log(nodes);
    }

    let index = <li id={`index_list_item_${id}`} key={`index_list_item_${id}`} value={id+'. '} indent={id.replace(/[.]+/gim, '').length}>
                <input id={id} key={id} defaultValue={title} placeholder={this.state.placeholder.length >= parseInt(id.replace(/[.]+/gim, '')) ? this.state.placeholder[parseInt(id.replace(/[.]+/gim, '')) - 1] : ''} autoFocus></input>
              </li>

    if (init) {
      return index;
    }
    else {
      this.setState({
        index: this.state.index.concat(index)
      })
    }
  }

  handleChange = (e) => {
    let id = e.target.id;
    let data = {
      title: e.target.value
    }
    let pages = getPropById(id, 'pages', this.props.index);
    
    if (pages.length === 0)
    { 
      data.pages = [this.props.document.length];
      this.props.setContents('add', null, null)
      this.props.setDesign('add', null, null) //TODO: Integration with setContents
    }

    this.props.setIndex('update', id, data);
    document.getElementById(`index_title_${id}`).innerText = e.target.value;
  }

  handleKeyDown = (e) => {
    let cur_id = e.target.id;
    switch (e.key) {
      case 'Enter':
        let levels = cur_id.split(".");
        if (e.target.value.length === 0 && levels.length > 1) {
          let last_level = levels[levels.length - 1];
          let prev_level = levels[levels.length - 2];
          let next_id = cur_id.substring(0, cur_id.length - last_level.length - prev_level.length - 1) + (parseInt(prev_level) + 1).toString();

          let pages = getPropById(cur_id, 'pages', this.props.index);
          pages.forEach((page) => {
            this.props.setContents("remove", page, null);
            this.props.setDesign("remove", page, null); //TODO: Integration with setContents
          })
          this.props.setIndex("remove", cur_id, );
          this.setState({
            index: this.state.index.filter(idx => idx.props.id !== `index_list_item_${cur_id}`)
          }, () => {
            this.addIndex(next_id, "");
            this.props.setIndex("add", next_id, {title: "", pages: []});
            this.props.renderPages();
          });
        }
        else {
          if (document.getElementById(`index_list_item_${cur_id}`).nextSibling) {
            this.addIndex(null, "", false, {id: cur_id});
          }
          else {
            let level = levels[levels.length - 1];
            let new_id = cur_id.substring(0, cur_id.length - level.length) + (parseInt(level) + 1).toString();
          
            try {
              document.getElementById(`index_list_item_${cur_id}`).nextSibling.childNodes[0].focus();
            }
            catch {
              this.addIndex(new_id, "");
              this.props.setIndex("add", new_id, {title: "", pages: []});
            }
          }
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
            }, () => {this.props.renderPages();});
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