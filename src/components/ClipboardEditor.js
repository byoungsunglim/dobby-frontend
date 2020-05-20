import React, { Component } from "react";
import ContentEditable from 'react-contenteditable'

import "./assets/css/ClipboardEditor.css";

class ClipboardEditor extends Component {
  state = {
  };

  componentDidMount() {
    
  }

  handleClipboard = (e) => {
    const id = e.target.id;
    var items = e.clipboardData.items;

    console.log("items", items);

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
            // console.log(id);
            // console.log(event.target.result)
            var img=document.createElement("img");
            img.src=event.target.result
            document.getElementById(id).appendChild(img);
        }; // data url  
        reader.readAsDataURL(blob);
    }
  }

  render() {
    return (
      <div id="clipboard_editor" onBlur={(e) => this.handleBlur(e)}>
      </div>
    )
  }
}

export default ClipboardEditor;
