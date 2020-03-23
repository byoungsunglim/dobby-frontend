import React, { Component } from "react";
import uuid from "uuid";

import { getPropById } from "./utils/getPropById.js";
import { orderList } from "./utils/orderList.js";

import "./assets/css/Index.css";

class Index extends Component {
  state = {
    placeholder: ["배경", "본론", "결론"]
  };

  componentDidMount() {
    console.log("Index Mounted...")
    if (this.props.index.length === 0) {
      let id = `index_item_${uuid()}`;
      let page = `page_${uuid()}`;
      this.props.setContents('add', page)
      this.props.setIndex('add', id, {
        title: "",
        indent: "1",
        pages: [page]
      })
    }
  }

  componentDidUpdate() {
    // console.log("index update")
    this.orderIndex();
  }

  orderIndex() {
    for (let indent = 1; indent <= 3; indent++) {
      orderList(document.querySelectorAll(`li[indent="${indent}"]`), this.state.placeholder);
    }
  }

  handleChange = (e) => {
    // console.log("handleChange", e.target.parentNode);
    let id = e.target.parentNode.id;
    let data = {
      title: e.target.value
    };

    this.props.setIndex('update', id, data);
    document.getElementById(id + '_title').innerText = e.target.value;
    // if (document.getElementById(id + '_title').innerText.length === 0) {
    //   if (document.getElementById(id + '_title').nextSibling.className === "contents"
    // }
  };

  handleKeyDown = (e) => {
    const index = document.getElementById("index");
    const target = e.target.parentNode;
    const id = e.target.parentNode.id;
    const value = e.target.value;
    const idx = this.props.index.findIndex(item => item.id === id);

    switch (e.key) {
      case "Enter":
        if (idx !== 0 && value.length === 0 && parseInt(target.getAttribute("indent")) > 1) {
          this.props.setIndex('update', id, {
            indent: parseInt(target.getAttribute("indent")) - 1
          })
        }
        else {
          // let new_idx = idx + Math.max(this.props.index.slice(idx+1).findIndex(item => item.indent === target.getAttribute("indent")), 1);
          let new_id = `index_item_${uuid()}`;
          let new_page = `page_${uuid()}`
          let new_item = {
            id: new_id,
            title: "",
            indent: target.getAttribute("indent"),
            pages: [new_page]
          };
          this.props.setContents('add', new_page);
          this.props.setIndex('set', null, this.props.index.slice(0, idx+1).concat(new_item).concat(this.props.index.slice(idx+1)));
        }

        this.props.renderPages();
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          if (idx !== 0 && parseInt(target.getAttribute("indent")) > 1) {
            this.props.setIndex('update', id, {
              indent: parseInt(target.getAttribute("indent")) - 1
            })
          }
        }
        else {
          if (idx !== 0 && parseInt(target.getAttribute("indent")) < 3) {
            this.props.setIndex('update', id, {
              indent: parseInt(target.getAttribute("indent")) + 1
            })
          }
        }

        this.props.renderPages();
        break;
      case 'Backspace':
        if (idx !== 0 && value.length === 0) {
          e.preventDefault();
          if (target.parentNode.previousSibling) {
            target.parentNode.previousSibling.firstChild.firstChild.focus();
          }
          let pages = getPropById(id, 'pages', this.props.index);
          if (pages) {
            pages.forEach((page) => {
              this.props.setContents("remove", page, null);
              this.props.setDesign("remove", page, null); //TODO: Integration with setContents
            })
          }
          this.props.setIndex("remove", id, );
        }

        this.props.renderPages();
        break;
      default:
        this.props.renderPages();
    }
  };

  render() {
    return (
      <div id="index" onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)}>
        <span style={{ fontSize: "16pt" }}>*목차를 먼저 적어주시면, 페이지가 자동으로 생성됩니다.</span>
        {this.props.index.map((item) => (
          <ol key={item.id} className={"index_item"}>
            <li key={item.id} id={item.id} indent={item.indent}>
              <input key={item.id} defaultValue={item.title} autoComplete="off" autoFocus></input>
            </li>
          </ol>
        ))}
      </div>
    );
  }
}

export default Index;