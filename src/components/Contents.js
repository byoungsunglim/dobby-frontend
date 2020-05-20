import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import uuid from "uuid";

import TextToolbar from "./TextToolbar";
import tools from "../utils/tools";
import { storage } from "../utils/Firebase";
import { orderList } from "../utils/orderList";
import { ImageLoader } from "../utils/getLoader";

import "./assets/css/Contents.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgrey" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "grey" : "white",
  // padding: grid,
  // width: 250
});

class Contents extends Component {
  constructor(props) {
    super(props);

    this.setTextToolbar = this.setTextToolbar.bind(this);
    this.setContent = this.setContent.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  state = {
    content: this.props.content,
    showToolbar: false,
    cur_id: null,
    x: 0,
    y: 0,
    img_loader: <ImageLoader/>
  }

  onDragEnd(result) {
    console.log("onDragEnd")
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const content = reorder(
      this.state.content,
      result.source.index,
      result.destination.index
    );

    this.setState({
      content: content
    }, () => {
      this.props.setPage(this.props.page);
      this.props.setDraft('update', this.props.page, {content: this.state.content});
    });
  }

  componentDidMount() {
    console.log("Content Mounted...")
    let content = [];

    // let data = this.props.content;
    if (this.props.content.length === 0) {
      if (this.props.page === "title") {
        // content.push(this.addContent(null, "문서 제목을 적어볼까요?", "", "h1", false, null, true));
        content.push({
          id: "body_" + uuid(),
          placeholder: "문서 제목을 적어볼까요?",
          html: "",
          type: "h1",
          disabled: false
        })
      }
      else {
        // content.push(this.addContent(null, "내용을 입력해주세요.", "", "h1", false, null, true));
        content.push({
          id: "body_" + uuid(),
          placeholder: "내용을 입력해주세요.",
          html: "",
          type: "h1",
          disabled: false
        })
      }

      this.setState({
        content: content
      }, () => {
        this.props.setDraft('update', this.props.page, {content: this.state.content});
      })
    }
    this.orderContent();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("contentDidUpdate");
    if (prevState.content !== this.state.content || prevProps.content !== this.props.content) {
      console.log("order list");
      this.orderContent();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {  
    if (this.state.content.length === this.props.content.length && this.state.showToolbar === nextState.showToolbar) {
      return false;
    }
    console.log("should content update", this.state.content.length, this.props.content.length)
    return true;
  }

  setTextToolbar = () => {
    this.setState({
      showToolbar: this.state.showToolbar ? false : true
    }, () => {
      if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
    })
  }

  setContent = (handle, id, placeholder, html, type, disabled, insertAfter) => {
    let new_body = {
      id: id,
      placeholder: placeholder,
      html: html,
      type: type,
      disabled: disabled
    }

    switch (handle) {
      case 'update':
        this.setState({
          content: this.state.content.map(
            body => body.id === id
              ? new_body
              : body
          )
        }, () => {
          // console.log("new_body", new_body);
          this.props.setDraft('update', this.props.page, {content: this.state.content});
          this.forceUpdate();
        })
        break;
      case 'add':
        if (insertAfter !== -1) {
          console.log("content insert")
          
          this.setState({
            content: this.state.content.slice(0, insertAfter+1).concat(new_body).concat(this.state.content.slice(insertAfter+1))
          }, () => {
            document.getElementById(id).focus();
            this.props.setDraft('update', this.props.page, {content: this.state.content})
          }); //TODO: list type insert before removes list tag... debug needed
        }
        break;
      case 'remove':
        this.setState({
          content: this.state.content.filter(body => body.id !== id)
        }, () => {
          this.props.setDraft('update', this.props.page, {content: this.state.content})
        })
        break;
      default:
    }
  }

  // addContent = (id, placeholder, html, type, disabled, insertAfter) => {
  //   const new_id = id || "body_" + uuid();
  //   // const id = this.state.content.length;
  //   let new_div = <ContentEditable id={new_id} key={new_id} placeholder={placeholder} html={html} type={type} disabled={disabled} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>;

  //   if (insertAfter !== -1) {
  //     console.log("content insert")
  //     this.setState({
  //       content: this.state.content.slice(0, insertAfter+1).concat(new_div).concat(this.state.content.slice(insertAfter+1))
  //     }, () => {
  //       document.getElementById(new_id).focus();
  //       this.props.setDraft('update', this.props.page, {
  //         [new_id]: html,
  //         content: this.state.content
  //       })
  //     }); //TODO: list type insert before removes list tag... debug needed
  //   }
  // }

  orderContent() {
    // for (let num = 1; num <= 6; num++) {
    //   let type = `h${num}`;
    //   for (let indent = 1; indent <= 6; indent++) {
    //     orderList(document.querySelectorAll(`[id^=body][type="${type}"] [class=list_item][indent="${indent}"]`), []);
    //   }
    //   // for (let indent = 1; indent <= 6; indent++) {
    //   //   orderList(document.querySelectorAll(`[class=list_item][indent="${indent}"]`), []);
    //   // }
    // }
    orderList(document.querySelectorAll("[id^=body] ol[class=list_item]"), [])
  }

  handleBlur = (e) => {
    // console.log("blur", e.target)
    let imgholders = document.getElementsByClassName("imgholder");
    for (let i = 0; i < imgholders.length; i++) {
      imgholders[i].style.border = '';
    }
  }

  handleChange = (e) => {
    // console.log("handleChange", e.currentTarget)
    const id = e.currentTarget.id;
    const html = e.currentTarget.innerHTML;
    this.setState({
      content: this.state.content.map(
        body => body.id === id ?
        {...body, html: html}
        : body
      )
    }, () => {
      // console.log("double change", e.currentTarget)
      // let data = {
      //   [id]: html,
      //   content: this.state.content
      // }
      this.props.setPage(this.props.page);
      this.props.setDraft('update', this.props.page, {content: this.state.content});
    })
  } //TODO: after text toolbar edited text, triggering handleChange needed!

  handleClick = (e) => {
    // console.log("handleClick", e.target);
    if (e.target.tagName === "IMG") {
      e.target.parentNode.style.border = '2px solid blue';
      e.target.parentNode.style.borderRadius = '5px';
    }
    if (e.target.className === "content") {
      if (this.state.content[this.state.content.length - 1].html.length > 0) {
        this.setContent("add", "body_" + uuid(), "", "", "h3", false, this.state.content.length - 1);
        this.forceUpdate();
      }
    }
  }

  handleDoubleClick = (e) => {
    // console.log("handleDoubleClick", e.target);
    if (e.target.tagName === "IMG") {
      this.setContent('remove', e.target.parentNode.parentNode.id);
    }
  }

  handleKeyDown = (e) => {
    const id = e.currentTarget.id;
    const target = e.currentTarget;
    const type = target.getAttribute('type');
    const value = target.innerHTML;
    const idx = this.state.content.findIndex(body => body.id === id);
    const selection = window.getSelection();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        let new_id = `body_${uuid()}`;
        let default_html = "";
        if (value.includes("</li>")) {
          if (target.firstChild.firstChild.innerHTML.length === 0) {
            let indent = parseInt(target.firstChild.getAttribute('indent'));
            if (indent > 1) {
              target.firstChild.setAttribute('indent', indent - 1);
            }
            else {
              target.innerHTML = "";
            }
            return;
          }
          // let div = target.cloneNode(true);
          // div.firstChild.key = new_id;
          // div.firstChild.firstChild.key = new_id;
          // div.firstChild.firstChild.id = `list_item_${uuid()}`;
          // div.firstChild.firstChild.innerHTML = "";
          // default_html = div.innerHTML;

          let item = React.createElement('li', {key: new_id, id: `list_item_${uuid()}`});
          let list = React.createElement(target.firstChild.tagName.toLowerCase(), {key: new_id, className: "list_item", indent: target.firstChild.getAttribute('indent'), start: 1}, item);
          default_html = ReactDOMServer.renderToStaticMarkup(list);
        }

        if (selection.anchorOffset === 0 && selection.focusOffset === 0) {
          // console.log("cursor front");
          if (idx === 0) {
            this.setContent("add", new_id, "", default_html, type === "h1" ? "h2" : type, false, idx);
          }
          else {
            this.setContent("add", new_id, "", default_html, type, false, idx - 1);
          }
        }
        else {
          // console.log("cursor back");
          this.setContent("add", new_id, "", default_html, type === "h1" ? "h2" : type, false, idx);
        }

        this.forceUpdate();
        break;
      case 'Tab':
        e.preventDefault();
        if (value.includes("</li>")) {
          let indent = parseInt(target.firstChild.getAttribute('indent'));
          if (e.shiftKey) {
            target.firstChild.setAttribute('indent', Math.max(indent - 1, 1));
          }
          else {
            target.firstChild.setAttribute('indent', Math.min(indent + 1, 6));
          }
          this.orderContent();
        }
        else {
          if (e.shiftKey) {
            target.setAttribute('type', 'h' + Math.max(parseInt(type.substring(1)) - 1, 1));
            this.setContent('update', id, "", value, 'h' + Math.max(parseInt(type.substring(1)) - 1, 1), false);
          }
          else {
            target.setAttribute('type', 'h' + Math.min(parseInt(type.substring(1)) + 1, 6));
            this.setContent('update', id, "", value, 'h' + Math.min(parseInt(type.substring(1)) + 1, 6), false);
          }
          // this.forceUpdate();
        }
        break;
      case ' ':
        if (value === "-") {
          e.preventDefault();
          let item = React.createElement('li', {key: id, id: `list_item_${uuid()}`}, '');
          let list = React.createElement('ul', {key: id, className: "list_item", indent: 1, start: 1}, item);
          this.setContent('update', id, "",  ReactDOMServer.renderToStaticMarkup(list), type, false);
        }
        else if (value.endsWith(".")) {
          if (/^\d+$/.test(value.substring(0, value.length - 1))) {
            e.preventDefault();
            let item = React.createElement('li', {key: id, id: `list_item_${uuid()}`}, '');
            let list = React.createElement('ol', {key: id, className: "list_item", indent: 1, start: 1}, item);
            this.setContent('update', id, "",  ReactDOMServer.renderToStaticMarkup(list), type, false);
          }
        }
        break;
      case 'Backspace':
        if (idx > 0 && target.innerText.trim().length === 0) {
          e.preventDefault();
          this.setContent('remove', id);
          this.setEndOfContenteditable(target.parentNode.previousSibling.childNodes[1]);
        }
        else if (value.includes("</li>") && selection.anchorOffset === 0 && selection.focusOffset === 0) {
          e.preventDefault();
          this.setContent('update', id, "", target.innerText.trim(), type, false);
        }
        break;
      case 'Delete':
        if (target.parentNode.nextSibling) {
          if (target.parentNode.nextSibling.childNodes[1].innerText.trim() === 0) {
            e.preventDefault();
            this.setContent('remove', target.parentNode.nextSibling.childNodes[1].id);
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        try {
          if (target.parentNode.previousSibling) {
            target.parentNode.previousSibling.childNodes[1].focus();
            this.setEndOfContenteditable(target.parentNode.previousSibling.childNodes[1]);
          }
        }
        catch {

        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        try {
          if (target.parentNode.nextSibling) {
            target.parentNode.nextSibling.childNodes[1].focus();
            this.setEndOfContenteditable(target.parentNode.nextSibling.childNodes[1]);
          }
        }
        catch {

        }
        break;  
      default:
    }
  }

  handleMouseOver = (e) => {
    // console.log("handleMouseOver", e.currentTarget)
    e.currentTarget.firstChild.style.visibility = "visible";
  }

  handleMouseOut = (e) => {
    // console.log("handleMouseOver", e.currentTarget)
    e.currentTarget.firstChild.style.visibility = "hidden"
  }

  handleSelect = (e) => {
    try {
      const selection = window.getSelection();
      // console.log("selection", selection.toString());
      const range = selection.getRangeAt(0);
      const bodyRect = range.getBoundingClientRect();
      // const refRect = e.target.getBoundingClientRect();
      const x = `${bodyRect.right}px`;
      const y = `${bodyRect.bottom}px`;

      if (selection.toString().length > 0) {
        this.setState({
          showToolbar: true,
          cur_id: e.target.id,
          x: x,
          y: y,
        })
      }
      else {
        this.setState({
          showToolbar: false,
          cur_id: e.target.id,
          x: x,
          y: y,
        })
      }
    }
    catch {
      console.log("selection error")
    }
    // this.forceUpdate();
  }

  setEndOfContenteditable = (contentEditableElement) => {
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
  }

  handlePaste = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const target = e.currentTarget;
    const value = target.innerHTML;
    const idx = this.state.content.findIndex(content => content.id === id);
    var items = e.clipboardData.items;

    if(items === undefined){
      if(typeof(callback) == "function"){
        alert("NO ITEM")
      }
    };

    var text = e.clipboardData.getData('Text');
    if (text.length > 0) {
      document.execCommand('insertText', true, text);
    }
    else {
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === -1) continue;
        // Retrieve image on clipboard as blob
        
        var ref_id = id;
        if (value.length !== 0) {
          ref_id = 'body_' + uuid();
          this.setContent("add", ref_id, null, ReactDOMServer.renderToStaticMarkup(<ImageLoader/>), "img", true, idx);
          this.forceUpdate();
        }
        else {
          ReactDOM.hydrate(<ImageLoader/>, target);
        }

        var blob = items[i].getAsFile();
        // eslint-disable-next-line no-loop-func
        storage.child(`images/${uuid()}`).put(blob).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          snapshot.ref.getDownloadURL().then(function(downloadURL) { 
            console.log('File available at', downloadURL);
            let img = new Image;
            img.id = 'img_' + uuid();
            img.src = downloadURL;
            img.onload = function() {
              console.log("img loaded...");
              img.setAttribute('width', img.width);
              img.setAttribute('height', img.height);
              let div = document.createElement("div");
              div.className = 'imgholder'
              let body = document.createElement("div");
              div.appendChild(img);
              body.appendChild(div);
              this.setContent('update', ref_id, null, body.innerHTML, "img", true); //TODO: image doubleclick not working right after added
              this.forceUpdate();
            }.bind(this)
          }.bind(this))
        }.bind(this));
      }
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div className="content" {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} onBlur={(e) => this.handleBlur(e)} onClick={(e) => this.handleClick(e)} onDoubleClick={(e) => this.handleDoubleClick(e)}>
              {this.state.content.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    onMouseOver={(e) => this.handleMouseOver(e)}
                    onMouseOut={(e) => this.handleMouseOut(e)}
                    >
                      <div className="dragBtn" style={{visibility: 'hidden'}}>
                        <tools.DragBtn id="dragBtn"/>
                      </div>
                      <ContentEditable key={item.id} id={item.id} placeholder={item.placeholder} html={item.html} type={item.type} disabled={item.disabled} onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {/* {this.state.content} */}
              {this.state.showToolbar ? <TextToolbar {...this} {...this.state} {...this.props}/> : null}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Contents;
