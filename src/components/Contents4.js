import React, { Component } from "react";
import uuid from "uuid";

import { getPropById } from "../utils/getPropById";
import { orderList } from "../utils/orderList";

import "./assets/css/Contents.css";

class Contents extends Component {
  state = {
    cur_id: null,
    placeholder: ["배경", "본론", "결론"]
  };

  componentDidMount() {
    console.log("Contents Mounted...")
    if (this.props.contents.length === 0) {
      let id = `contents_item_${uuid()}`;
      let page = `page_${uuid()}`;
      this.props.setDraft('add', page)
      this.props.setContents('add', id, {
        title: "",
        indent: "1",
        pages: [page]
      })
    }
  }

  componentDidUpdate() {
    // console.log("contents updated")
    this.orderContents();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextProps.contents.length === this.props.contents.length) {
    //   return false;
    // }
    // console.log("should contents update", this.state.init, nextProps.contents.length, this.props.contents.length);
    return true;
  }

  orderContents() {
    // for (let indent = 1; indent <= 3; indent++) {
    //   orderList(document.querySelectorAll(`[class=contents_item][indent="${indent}"]`), this.state.placeholder);
    // }
    orderList(document.querySelectorAll("[class=contents_item]"), this.state.placeholder);
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
        e.preventDefault();
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
          this.props.setDraft('add', new_page);
          this.props.setContents('set', null, this.props.contents.slice(0, idx+1).concat(new_item).concat(this.props.contents.slice(idx+1)));
          this.setState({
            cur_id: new_id
          }, () => {
            try {
              document.getElementById(this.state.cur_id).firstChild.focus();
            }
            catch {
            }
          })
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

        this.forceUpdate();
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
            for (let i = 0; i < pages.length; i++) {
              this.props.setDraft("remove", pages[i], null);
              this.props.setDesign("remove", pages[i], null); //TODO: Integration with setContents
            }
          }
          this.props.setContents("remove", id, );
        }

        this.props.renderPages();
        break;
      case 'Delete':
        if (target.parentNode.nextSibling) {
          if (target.parentNode.nextSibling.firstChild.firstChild.value.length === 0) {
            e.preventDefault();
            console.log(target.parentNode.nextSibling.firstChild.id)
            let pages = getPropById(target.parentNode.nextSibling.firstChild.id, 'pages', this.props.contents);
            if (pages) {
              for (let i = 0; i < pages.length; i++) {
                this.props.setDraft("remove", pages[i], null);
                this.props.setDesign("remove", pages[i], null); //TODO: Integration with setContents
              }
            }
            this.props.setContents("remove", target.parentNode.nextSibling.firstChild.id, );
          }
        }

        this.props.renderPages();
        break;
      case 'ArrowUp':
        e.preventDefault();
        try {
          if (target.parentNode.previousSibling) {
            target.parentNode.previousSibling.firstChild.firstChild.focus();
          }
        }
        catch {

        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        try {
          if (target.parentNode.nextSibling) {
            target.parentNode.nextSibling.firstChild.firstChild.focus();
          }
        }
        catch {

        }
        break;
      default:
        this.props.renderPages();
    }
  };

  moveCaretAtEnd(e) {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    return (
      <div id="contents" onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)}>
        <span style={{ fontSize: "16pt" }}>*목차를 먼저 적어주시면, 페이지가 자동으로 생성됩니다.</span>
        {this.props.contents.map((item) => (
          <ol key={item.id} className={"contents_item"} indent={item.indent}>
            <li key={item.id} id={item.id}>
              <input key={item.id} defaultValue={item.title} autoComplete="off" onFocus={this.moveCaretAtEnd}></input>
            </li>
          </ol>
        ))}
      </div>
    );
  }
}

export default Contents;