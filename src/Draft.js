import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import uuid from "uuid";

import Content from "./Content";
import TextToolbar from "./TextToolbar";
import tools from "./utils/tools";
import { storage } from "./utils/Firebase";
import { orderList } from "./utils/orderList";
import { ImageLoader } from "./utils/getLoader";

import "./assets/css/Draft.css";

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

class Draft extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  //   this.handleDoubleClick = this.handleDoubleClick.bind(this);
  //   this.handleFocus = this.handleFocus.bind(this);
  //   this.handleKeyDown = this.handleKeyDown.bind(this);
  //   this.handleMouseOut = this.handleMouseOut.bind(this);
  //   this.handleMouseOver = this.handleMouseOver.bind(this);
  //   this.handlePaste = this.handlePaste.bind(this);
  //   this.handleSelect = this.handleSelect.bind(this);
  // }

  state = {
    draft: [],
    showToolbar: false,
    cur_id: null,
    x: 0,
    y: 0,
    img_loader: <ImageLoader/>
  }

  handleChange = (e) => {
    this.props.setTitle(e.target.value);
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
    console.log("Draft Mounted...")

    if (this.props.draft.length === 0) {
      this.props.setDraft('set', null, [{
        id: "content_" + uuid(),
        placeholder: "문서 제목을 적어볼까요?",
        html: "",
        type: "h",
        level: 1,
        indent: null,
        start: null,
        disabled: false
      }]);
    }
  } 

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("Draft Did Update...");
  //   this.orderContent();
  // }

  shouldComponentUpdate(nextProps, nextState) {  
    if (this.props.draft.length === nextProps.draft.length) {
      return false;
    }

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

  // setContent = (handle, id, placeholder, html, type, disabled, insertAfter) => {
  //   let new_body = {
  //     id: id,
  //     placeholder: placeholder,
  //     html: html,
  //     type: type,
  //     disabled: disabled
  //   }

  //   switch (handle) {
  //     case 'update':
  //       this.setState({
  //         content: this.state.content.map(
  //           body => body.id === id
  //             ? new_body
  //             : body
  //         )
  //       }, () => {
  //         // console.log("new_body", new_body);
  //         this.props.setDraft('update', this.props.page, {content: this.state.content});
  //         this.forceUpdate();
  //       })
  //       break;
  //     case 'add':
  //       if (insertAfter !== -1) {
  //         console.log("content insert")
          
  //         this.setState({
  //           content: this.state.content.slice(0, insertAfter+1).concat(new_body).concat(this.state.content.slice(insertAfter+1))
  //         }, () => {
  //           document.getElementById(id).focus();
  //           this.props.setDraft('update', this.props.page, {content: this.state.content})
  //         }); //TODO: list type insert before removes list tag... debug needed
  //       }
  //       break;
  //     case 'remove':
  //       this.setState({
  //         content: this.state.content.filter(body => body.id !== id)
  //       }, () => {
  //         this.props.setDraft('update', this.props.page, {content: this.state.content})
  //       })
  //       break;
  //     default:
  //   }
  // }

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
    orderList(document.querySelectorAll("[id^=body] ol[class=list_item]"), [])
  }

  handleChange = (e) => {
    // console.log("handleChange", e.currentTarget)
    this.props.setDraft('update', e.currentTarget.id, {html: e.currentTarget.innerHTML});
  }

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

  handleFocus = (e) => {
    // console.log("handleFocus", e.target);
    this.setEndOfContenteditable(e.target);
  }

  handleKeyDown = (e) => {
    const target = e.target;
    const value = target.innerHTML;
    const idx = this.props.draft.findIndex(content => content.id === target.id);
    const { id, placeholder, html, type, level, indent, start, disabled } = this.props.draft[idx];
    const selection = window.getSelection();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selection.anchorOffset === 0 && selection.focusOffset === 0 && idx > 1) {
          this.props.setDraft("add", null, {
            id: "content_" + uuid(),
            placeholder: placeholder,
            html: "",
            type: type,
            level: level,
            indent: indent,
            start: start,
            disabled: disabled
          }, idx - 1)
        }
        else {
          this.props.setDraft("add", null, {
            id: "content_" + uuid(),
            placeholder: "",
            html: "",
            type: type,
            level: Math.max(2, level),
            indent: indent,
            start: start,
            disabled: disabled
          }, idx)
        }

        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          if (type === 'h') {
            target.setAttribute("level", Math.max(1, level - 1))
            this.props.setDraft('update', id, {level: Math.max(1, level - 1)});
          }
          else {
            target.setAttribute("indent", Math.max(1, indent - 1))
            this.props.setDraft('update', id, {indent: Math.max(1, indent - 1)});
          }
        }
        else {
          if (type === 'h') {
            target.setAttribute("level", Math.min(6, level + 1))
            this.props.setDraft('update', id, {level: Math.min(6, level + 1)});
          }
          else {
            target.setAttribute("indent", Math.min(6, level + 1))
            this.props.setDraft('update', id, {indent: Math.min(6, level + 1)});
          }
        }

        break;
      case ' ':
        if (value === "-") {
          e.preventDefault();
          this.props.setDraft('update', id, {html: '', type: 'ul', indent: this.props.draft[Math.max(0, idx - 1)].indent || 1, start: null});
        }
        else if (value.endsWith(".")) {
          let start = value.substring(0, value.length - 1);
          if (/^\d+$/.test(start)) {
            e.preventDefault();
            this.props.setDraft('update', id, {html: '', type: 'ol', indent: this.props.draft[Math.max(0, idx - 1)].indent || 1, start: start});
          }
        }
        this.forceUpdate();
        break;
      case 'Backspace':
        if (idx > 0 && html.trim().length === 0) {
          e.preventDefault();
          this.props.setDraft('remove', id, null, idx - 1);
        }
        // else if (value.includes("</li>") && selection.anchorOffset === 0 && selection.focusOffset === 0) {
        //   e.preventDefault();
        //   // this.setContent('update', id, "", target.innerText.trim(), type, false);
        // }
        break;
      case 'Delete':
        if (target.parentNode.nextSibling) {
          if (target.parentNode.nextSibling.childNodes[1].innerText.trim() === 0) {
            e.preventDefault();
            this.props.setDraft('remove', target.parentNode.nextSibling.childNodes[1].id);
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        try {
          if (target.parentNode.previousSibling) {
            target.parentNode.previousSibling.childNodes[1].focus();
            // this.setEndOfContenteditable(target.parentNode.previousSibling.childNodes[1]);
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
            // this.setEndOfContenteditable(target.parentNode.nextSibling.childNodes[1]);
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
      <div id="draft">
        <div id="header">
          <ContentEditable placeholder="문서 제목" html={this.props.title} onChange={(e) => this.handleChange(e)} spellCheck={false}/>
          <span>{this.props.updatedAt.toDate().toString().split(" ").slice(0, 5).join(" ")}</span>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div className="content" {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} onClick={(e) => this.handleClick(e)} onDoubleClick={(e) => this.handleDoubleClick(e)}>
              {this.props.draft.map((content, index) => (
                <Draggable key={content.id} draggableId={content.id} index={index}>
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
                      <Content content={content} {...this}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {this.state.showToolbar ? <TextToolbar {...this} {...this.state} {...this.props}/> : null}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    );
  }
}

export default Draft;
