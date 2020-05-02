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
  state = {
    showToolbar: false,
  }

  handleChange = (e) => {
    this.props.setTitle(e.target.value);
  }

  onDragEnd = (result) => {
    // console.log("onDragEnd", result)
    if (!result.destination) {
      return;
    }

    let draft = reorder(
      this.props.draft,
      result.source.index,
      result.destination.index
    );

    this.orderContent(draft, result.destination.index);
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

  componentDidUpdate(prevProps, prevState) {
    // console.log("Draft Did Update...");
    // orderList(this.props.draft).then((data) => {
      // console.log(data);
      // this.props.setDraft('set', null, data);
    // })
  }

  shouldComponentUpdate(nextProps, nextState) {  
    if (this.props.draft.length === nextProps.draft.length) {
      return false;
    }

    return true;
  }

  setTextToolbar = () => {
    this.setState({
      showToolbar: false
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
      this.forceUpdate();
    })
  }

  orderContent = (draft, idx) => {
    orderList(draft).then((data) => {
      this.props.setDraft('set', null, data);
      this.forceUpdate(() => {
        document.getElementById(this.props.draft[idx].id).focus();
      });
    })
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
    const value = target.innerText;
    const idx = this.props.draft.findIndex(content => content.id === target.id);
    const { id, placeholder, html, type, level, indent, start, disabled } = this.props.draft[idx];
    const selection = window.getSelection();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selection.anchorOffset === 0 && selection.focusOffset === 0) {
          if (value.length === 0 && (type === 'ul' || type === 'ol')) {
            if (indent > 1) {
              let draft = this.props.draft;
              draft[idx].indent = indent - 1;
              this.orderContent(draft, idx);
            }
            else {
              let draft = this.props.draft;
              draft[idx].type = 'h';
              draft[idx].indent = null;
              draft[idx].start = null;

              this.orderContent(draft, idx);
            }
          }
          else {
            let draft = this.props.draft;
            draft = draft.slice(0, idx).concat({
              id: "content_" + uuid(),
              placeholder: "",
              html: "",
              type: type,
              level: level,
              indent: indent,
              start: Math.max(1, start - 1),
              disabled: disabled
            }).concat(draft.slice(idx));

            this.orderContent(draft, idx+1);
          }
        }
        else {
          let draft = this.props.draft;
          draft = draft.slice(0, idx+1).concat({
            id: "content_" + uuid(),
            placeholder: "",
            html: "",
            type: type,
            level: level,
            indent: indent,
            start: start + 1,
            disabled: disabled
          }).concat(draft.slice(idx+1));

          this.orderContent(draft, idx+1);
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
            let draft = this.props.draft;
            draft[idx].indent = Math.max(1, indent - 1);
            this.orderContent(draft, idx);
          }
        }
        else {
          if (type === 'h') {
            target.setAttribute("level", Math.min(6, level + 1))
            this.props.setDraft('update', id, {level: Math.min(6, level + 1)});
          }
          else {
            let draft = this.props.draft;
            draft[idx].indent = Math.min(6, indent + 1);
            this.orderContent(draft, idx);
          }
        }

        break;
      case ' ':
        if (value === "-") {
          e.preventDefault();
          let draft = this.props.draft;
          draft[idx].html = '';
          draft[idx].type = 'ul';
          draft[idx].indent = draft[Math.max(0, idx - 1)].indent || 1;
          draft[idx].start = null;
          this.orderContent(draft, idx);
        }
        else if (value.endsWith(".")) {
          if (/^\d+$/.test(value.substring(0, value.length - 1))) {
            e.preventDefault();
            let draft = this.props.draft;
            draft[idx].html = '';
            draft[idx].type = 'ol';
            draft[idx].indent = draft[Math.max(0, idx - 1)].indent || 1;
            draft[idx].start = draft[Math.max(0, idx - 1)].start + 1 || 1;

            this.orderContent(draft, idx);
          }
        }

        break;
      case 'Backspace':
        console.log(idx);
        if (idx === 0 && value.trim().length === 0 && type !== 'h') {
          this.props.setDraft('update', id, {type: 'h', indent: null, start: null});
          this.forceUpdate(() => {
            document.getElementById(this.props.draft[0].id).focus();
          });
        }
        else if (idx > 0 && value.trim().length === 0) {
          e.preventDefault();
          let draft = this.props.draft;
          draft = draft.filter(content => content.id !== id)
          this.orderContent(draft, idx-1)
        }

        break;
      case 'Delete':
        // console.log(value.length, selection, selection.anchorOffset, selection.focusOffset)
        if (value.length === selection.anchorOffset && value.length === selection.focusOffset) {
          e.preventDefault();
          if (this.props.draft[Math.min(this.props.draft.length - 1, idx +1)].html.length === 0) {
            this.props.setDraft('remove', this.props.draft[Math.min(this.props.draft.length - 1, idx +1)].id, null, idx)
          }
          else {
            this.props.setDraft('update', this.props.draft[Math.min(this.props.draft.length - 1, idx +1)].id, {html: this.props.draft[Math.min(this.props.draft.length - 1, idx +1)].html.substring(1)})
          }
        }
        //TODO:need refininig
        break;
      case 'ArrowUp':
        e.preventDefault();
        document.getElementById(this.props.draft[Math.max(0, idx - 1)].id).focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        document.getElementById(this.props.draft[Math.min(this.props.draft.length - 1, idx + 1)].id).focus();
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
