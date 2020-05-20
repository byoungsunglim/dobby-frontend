import React, { Component } from "react";
import uuid from "uuid";

import { getPropById } from "../utils/getPropById";
import { orderList } from "../utils/orderList";

import "./assets/css/Contents.css";

class Contents extends Component {
  state = {
    init: true,
    contents: [],
    placeholder: ["배경", "본론", "결론"]
  };

  componentDidMount() {
    console.log("Contents Mounted...")
    let contents = [];

    if (this.props.contents.length === 0) {
      let id = `contents_item_${uuid()}`;
      let page = `page_${uuid()}`;
      this.props.setDocument('add', page)
      this.props.setContents('add', id, {
        title: "",
        indent: "1",
        pages: [page]
      })
      contents.push(this.addContents(null, 1, "", null, true))
    }
    else {
      
    }

    this.setState({
      contents: contents
    }, () => {
      
    })
  }

  componentDidUpdate() {
    // console.log("index update")
    this.orderContents();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.contents.length === this.props.contents.length) {
      return false;
    }
    console.log("should contents update", nextProps, this.props);
    return true;
  }

  addContents = (id, indent, title, insertAfter, init) => {
    const new_id = id || "contents_item_" + uuid();

    let new_contents = (
      <ol key={'ol'+new_id} className={"contents_item"} indent={indent}>
        <li key={'li'+new_id} id={new_id}>
          <input key={'input'+new_id} defaultValue={title} autoComplete="off" autoFocus></input>
        </li>
      </ol>
    )

    if (init) {
      console.log("contents init")
      return new_contents;
    }
    else if (insertAfter !== -1) {
      console.log("contents insert")
      this.setState({
        contents: this.state.contents.slice(0, insertAfter+1).concat(new_contents).concat(this.state.content.slice(insertAfter+1))
      }, () => {
        document.getElementById(new_id).focus();
        // this.props.setContents('update', this.props.page, {
        //   [new_id]: html,
        //   content: this.state.content
        // })
      }); //TODO: list type insert before removes list tag... debug needed
    }
  }

  orderContents() {
    for (let indent = 1; indent <= 3; indent++) {
      orderList(document.querySelectorAll(`[class=contents_item][indent="${indent}"]`), this.state.placeholder);
    }
  }

  handleChange = (e) => {
    // console.log("handleChange", e.target.parentNode);
    let id = e.target.parentNode.id;
    let data = {
      title: e.target.value
    };

    this.props.setContents('update', id, data);
    document.getElementById(id + '_title').innerText = e.target.value;
    // if (document.getElementById(id + '_title').innerText.length === 0) {
    //   if (document.getElementById(id + '_title').nextSibling.className === "contents"
    // }
  };

  handleKeyDown = (e) => {
    const contents = document.getElementById("contents");
    const target = e.target.parentNode;
    const id = e.target.parentNode.id;
    const value = e.target.value;
    const idx = this.props.contents.findIndex(item => item.id === id);

    switch (e.key) {
      case "Enter":
        if (idx !== 0 && value.length === 0 && parseInt(target.parentNode.getAttribute("indent")) > 1) {
          this.props.setContents('update', id, {
            indent: parseInt(target.parentNode.getAttribute("indent")) - 1
          })
        }
        else {
          // let new_idx = idx + Math.max(this.props.index.slice(idx+1).findIndex(item => item.indent === target.parentNode.getAttribute("indent")), 1);
          let new_id = `contents_item_${uuid()}`;
          let new_page = `page_${uuid()}`
          let new_item = {
            id: new_id,
            title: "",
            indent: target.parentNode.getAttribute("indent"),
            pages: [new_page]
          };
          this.props.setDocument('add', new_page);
          this.props.setContents('set', null, this.props.contents.slice(0, idx+1).concat(new_item).concat(this.props.contents.slice(idx+1)));
        }

        this.props.renderPages();
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          if (idx !== 0 && parseInt(target.parentNode.getAttribute("indent")) > 1) {
            this.props.setContents('update', id, {
              indent: parseInt(target.parentNode.getAttribute("indent")) - 1
            })
          }
        }
        else {
          if (idx !== 0 && parseInt(target.parentNode.getAttribute("indent")) < 3) {
            this.props.setContents('update', id, {
              indent: parseInt(target.parentNode.getAttribute("indent")) + 1
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
          let pages = getPropById(id, 'pages', this.props.contents);
          if (pages) {
            pages.forEach((page) => {
              this.props.setDocument("remove", page, null);
              this.props.setDesign("remove", page, null); //TODO: Integration with setContents
            })
          }
          this.props.setContents("remove", id, );
        }

        this.props.renderPages();
        break;
      default:
        this.props.renderPages();
    }
  };

  render() {
    return (
      <div id="contents" onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)}>
        <span style={{ fontSize: "16pt" }}>*목차를 먼저 적어주시면, 페이지가 자동으로 생성됩니다.</span>
        {this.state.contents.map((item) => (
          <ol key={'ol'+item.id} className={"contents_item"} indent={item.indent}>
            <li key={'li'+item.id} id={item.id}>
              <input key={'input'+item.id} defaultValue={item.title} autoComplete="off" autoFocus></input>
            </li>
          </ol>
        ))}
      </div>
    );
  }
}

export default Contents;