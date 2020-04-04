import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import uuid from "uuid";

import TextToolbar from "./TextToolbar.js";
import tools from "./utils/tools.js";
import { db , storage } from "./firebase.js";
import { orderList } from "./utils/orderList.js";
import { ImageLoader } from "./utils/getLoader.js";

import "./assets/css/Content.css";

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

class Content extends Component {
  constructor(props) {
    super(props);

    this.setContent = this.setContent.bind(this);
    // this.addContent = this.addContent.bind(this);
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
      this.props.setDocument('update', this.props.page, {content: this.state.content});
      this.props.setPage(this.props.page);
    });
  }

  componentDidMount() {
    console.log("Content Mounted...")
    let content = [];

    // let data = this.props.content;
    if (this.props.content.length === 0) {
      if (this.props.page === "page_title") {
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
        this.props.setDocument('update', this.props.page, {content: this.state.content});
      })
    }
    // else {
    //   for (let idx = 0; idx < this.props.content.length; idx++) {
    //     content.push(this.addContent(data.content[idx].props.id, data.content[idx].props.placeholder, data[data.content[idx].props.id], data.content[idx].props.type, data.content[idx].props.disabled, null, true));
    //   }
    // }

    // this.setState({
    //   init: false,
    //   content: content
    // })
  }

  componentDidUpdate() {
    console.log("content updated");
    this.orderContent();
  }

  shouldComponentUpdate(nextProps, nextState) {  
    if (nextProps.content.length === this.props.content.length) {
      return false;
    }
    console.log("should content update", nextProps.content.length, nextState.length, nextState.showToolbar, this.state.showToolbar)
    return true;
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
          this.props.setDocument('update', this.props.page, {content: this.state.content})
        })
        break;
      case 'add':
        if (insertAfter !== -1) {
          console.log("content insert")
          
          this.setState({
            content: this.state.content.slice(0, insertAfter+1).concat(new_body).concat(this.state.content.slice(insertAfter+1))
          }, () => {
            document.getElementById(id).focus();
            this.props.setDocument('update', this.props.page, {content: this.state.content})
          }); //TODO: list type insert before removes list tag... debug needed
        }
        break;
      case 'remove':
        this.setState({
          content: this.state.content.filter(body => body.id !== id)
        }, () => {
          this.props.setDocument('update', this.props.page, {content: this.state.content})
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
  //       this.props.setDocument('update', this.props.page, {
  //         [new_id]: html,
  //         content: this.state.content
  //       })
  //     }); //TODO: list type insert before removes list tag... debug needed
  //   }
  // }

  orderContent() {
    for (let indent = 1; indent <= 6; indent++) {
      orderList(document.querySelectorAll(`[class=list_item][indent="${indent}"]`), []);
    }
  }

  handleBlur = (e) => {
    // console.log("blur", e.target)
    let imgholders = document.getElementsByClassName("imgholder");
    for (let i = 0; i < imgholders.length; i++) {
      imgholders[i].style.border = '';
    }
    this.setState({
      showToolbar: false,
      cur_id: null,
      x: 0,
      y: 0,
    })

    // document.addEventListener('selectionchange', () => {
    //   if(document.getSelection().toString().length === 0) {
    //     this.setState({
    //       showToolbar: false,
    //       cur_id: null,
    //       x: 0,
    //       y: 0,
    //     })
    //   }
    // });
  }

  handleChange = (e) => {
    // console.log("haandleChange", e.currentTarget)
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

      this.props.setDocument('update', this.props.page, {content: this.state.content});
      this.props.setPage(this.props.page);
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
        this.setContent("add", "body_" + uuid(), "", "", this.state.content[this.state.content.length - 1].type || "h3", false, this.state.content.length - 1);
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
          let div = target.cloneNode(true);
          div.firstChild.key = new_id;
          div.firstChild.firstChild.key = new_id;
          div.firstChild.firstChild.id = `list_item_${uuid()}`;
          div.firstChild.firstChild.innerHTML = "";
          default_html = div.innerHTML;
        }

        if (selection.anchorOffset === 0 && selection.focusOffset === 0) {
          // console.log("cursor front");
          if (idx === 0) {
            this.setContent("add", new_id, "", default_html, target.getAttribute('type') === "h1" ? "h2" : target.getAttribute('type'), false, idx);
          }
          else {
            this.setContent("add", new_id, "", default_html, target.getAttribute('type'), false, idx - 1);
          }
        }
        else {
          // console.log("cursor back");
          this.setContent("add", new_id, "", default_html, target.getAttribute('type') === "h1" ? "h2" : target.getAttribute('type'), false, idx);
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
        }
        else {
          if (e.shiftKey) {
            document.execCommand('outdent');
          }
          else {
            document.execCommand('indent');
          }
        }
        break;
      case 'Backspace':
        if (idx > 0 && value.length === 0) {
          e.preventDefault();
          this.setContent('remove', id);
          this.setEndOfContenteditable(target.parentNode.previousSibling.childNodes[1]);
        }
        this.forceUpdate();
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
    const selection = window.getSelection();
    // console.log("selection", selection.toString());
    const range = selection.getRangeAt(0);
    const bodyRect = range.getBoundingClientRect();
    // const refRect = e.target.getBoundingClientRect();
    const x = `${bodyRect.right}px - 15%`;
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
    this.forceUpdate();
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
              this.setContent('update', ref_id, null, body.innerHTML, "img", true);
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

export default Content;