import React, { useState } from "react";

import ContentEditable from "react-contenteditable";
import { ImageLoader } from "../utils/getLoader";

import "../assets/css/Content.css";

function Content({ content, ...props }) {
  const [loading, setLoading] = useState(true);
  const {handleChange, handleFocus, handleKeyDown, handlePaste, handleSelect} = props;

  switch (content.type) {
    case 'h':
      return (
        <ContentEditable className="content" key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)} onFocus={(e) => handleFocus(e)} onKeyDown={(e) => handleKeyDown(e)} onPaste={(e) => handlePaste(e)} onSelect={(e) => handleSelect(e)}/>
      );
    case 'ul':
      return (
        <ul indent={content.indent} level={content.level}>
          <li>
            <ContentEditable className="content" key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)} onFocus={(e) => handleFocus(e)} onKeyDown={(e) => handleKeyDown(e)} onPaste={(e) => handlePaste(e)} onSelect={(e) => handleSelect(e)}/>
          </li>
        </ul>
      );
    case 'ol':
      return (
        <ol indent={content.indent} level={content.level} start={content.start}>
          <li>
            <ContentEditable className="content" key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)} onFocus={(e) => handleFocus(e)} onKeyDown={(e) => handleKeyDown(e)} onPaste={(e) => handlePaste(e)} onSelect={(e) => handleSelect(e)}/>
          </li>
        </ol>
      );
    case 'img':
      if (content.src) {
        return (
          <div key={content.id} id={content.id}>
            <div className="imgholder">
              <ImageLoader loading={loading}/>
              <img alt="content img" style={{display: loading ? "none" : "block"}} src={content.src} width={content.width} height={content.height} onLoad={() => setLoading(false)}></img>
            </div>
          </div>
        )
      }
      else {
        return (
          <div key={content.id} id={content.id}>
            <ImageLoader loading={loading}/>
          </div>
        )
      }
      
    default:
  }
}

export default Content;
