import ContentEditable from 'react-contenteditable'
import parse from 'html-react-parser';
import React, { Component } from "react";
import uuid from "uuid";

import TextToolbar from './TextToolbar';

import "./assets/css/Contents.css";

class Contents extends Component {
  state = {
    content: [],
    showToolbar: false,
    cur_id: null,
    x: 0,
    y: 0,
  }

  componentWillMount() {
    let content = [];

    if (this.props.contents.contents === null) {
      if (this.props.page === 0) {
        content.push(this.addContent(null, "문서 제목을 적어볼까요?", "", "title", true, null));
      }
      else {
        content.push(this.addContent(null, "내용을 입력해주세요.", "", "h1", true, null));
      }
    }
    else {
      for (let idx = 0; idx < this.props.contents.contents.length; idx++) {
        content.push(this.addContent(this.props.contents.contents[idx].props.id, this.props.contents.contents[idx].props.placeholder, this.props.contents.contents[idx].props.html, this.props.contents.contents[idx].props.type, true));
      }
    }

    this.setState({
      content: content
    })
  }

  componentDidUpdate() {
    console.log("updated", this.state.content);
  }

  addContent = (id, placeholder, html, type, init, insert) => {
    const new_id = id || "body_" + uuid();
    // const id = this.state.content.length;
    let new_div = <ContentEditable id={new_id} placeholder={placeholder} html={html} type={type} disabled={false} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>;

    if (init) {
      console.log("init")
      return new_div;
    }
    else if (insert) {
      console.log("insert")
      let idx = 0;
      for (let i = 0; i < this.state.content.length; i++) {
        if (this.state.content[i].props.id === insert.id) {
          break;
        }
        else {
          idx++;
        }
      }

      console.log("idx", idx);
      console.log("content#", this.state.content);

      this.setState({
        content: this.state.content.slice(0, idx).concat(new_div).concat(this.state.content.slice(idx))
      }, () => {
        // document.getElementById(new_id).focus();
        console.log("content##", this.state.content);
        this.props.setContents('update', this.props.page, {
          [new_id]: html,
          content: this.state.content
        })
        console.log("content###", this.state.content);
      }); //TODO: list type insert before removes list tag... debug needed
      console.log("content####", this.state.content);
    }
    else {
      console.log("else")
      this.setState({
        content: this.state.content.concat(new_div)
      }, () => {
        document.getElementById(new_id).focus();
        this.props.setContents('update', this.props.page, {
          [new_id]: html,
          content: this.state.content
        })
      });
    }
  }

  handleChange = (e) => {
    if (e.currentTarget.innerHTML) {
      console.log("handleChange", e.currentTarget);

      this.setState({
        content: this.state.content.map(
          div => div.props.id === e.currentTarget.id ?
          <ContentEditable id={e.currentTarget.id} placeholder={e.currentTarget.getAttribute('placeholder')} html={e.currentTarget.innerHTML} type={e.currentTarget.getAttribute('type')} disabled={false} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
          : div
        )
      }, () => {
        // console.log("double change", e.currentTarget)
        let data = {
          [e.currentTarget.id]: e.currentTarget.innerHTML,
          content: this.state.content
        }
  
        this.props.setContents('update', this.props.page, data);
        this.props.setPage(this.props.page);
      })
    }
  } //TODO: after text toolbar edited text, triggering handleChange needed!

  handleKeyDown = (e) => {
    const id = e.currentTarget.id;
    const target = document.getElementById(id);
    const value = target.innerHTML;
    const list_tag = value.includes("<li>") ? value.split("<li>")[0] + "<li>" : "";
    const selection = window.getSelection();
   
    switch (e.key) {
      case 'Enter':
        e.preventDefault();

        if (selection.anchorOffset === 0 && selection.focusOffset === 0 && value.length > 0) {
          console.log("front enter")
          console.log("element", target);
          this.addContent(null, target.getAttribute('placeholder'), list_tag, target.getAttribute('type'), false, {id:id});
        }
        else {
          console.log("back enter")
          console.log("next element", target.nextElementSibling);
          // try {
          //   this.setEndOfContenteditable(target.nextElementSibling);
          // }
          // catch {
            this.addContent(null, "", list_tag, target.getAttribute('type'), false, target.nextElementSibling)
          // }
        }
        break;
      case 'Tab':
        let values = value.split("\n");
        console.log(values[values.length - 1])
        if (values[values.length - 1].includes('\u2022')) {
          console.log("##")
          e.target.value += '\t';
        }
        else {
          e.target.value += `&#9679`;
        }
        break;
      case 'Backspace':
        if (value.length === 0 && this.state.content.length > 1) {
          try {
            e.preventDefault();
            let new_content = this.props.document;
            delete new_content[id];
            this.props.setContents('update', this.props.page, new_content);
            this.setState({
              content: this.state.content.filter(item => item.props.id !== id)
            });
            this.setEndOfContenteditable(target.previousSibling);
          }
          catch {
            //TODO: error handling
          }
        }
        break;

      default:
    }
  }

  handlePaste = (e) => {
    const id = e.currentTarget.id;
    var items = e.clipboardData.items;

    if(items === undefined){
      if(typeof(callback) == "function"){
        alert("NO ITEM")
      }
    };

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") === -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();
        var reader = new FileReader();
        reader.onload = function(event)
        {
            console.log(id);
            console.log(event.target.result)
            var img=document.createElement("img");
            img.src=event.target.result
            document.getElementById(id).appendChild(img);
        }; // data url  
        reader.readAsDataURL(blob);
    }
  }

  handleSelect = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const bodyRect = range.getBoundingClientRect();
    const refRect = document.getElementsByClassName(`contents_${this.props.page}`)[0].getBoundingClientRect();
    const x = `${bodyRect.x}px - ${refRect.x}px`;
    const y = `${bodyRect.bottom}px - ${refRect.y}px`;

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



  render() {
    return (
        <div className={`contents_${this.props.page}`}>
          {this.state.content}
          {this.state.showToolbar ? <TextToolbar {...this.state} {...this.props}/> : null}
        </div>
    );
  }
}

export default Contents;
