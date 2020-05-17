import React, { useState } from "react";

import ContentEditable from "react-contenteditable";
import { ImageLoader } from "./getLoader";

function ContentBox({ content, ...props }) {
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    props.setDraft('update', e.currentTarget.id, {
      html: e.target.value
    })
  }

  switch (content.type) {
    case 'h':
      return (
        <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)}/>
      );
    case 'ul':
      return (
        <ul indent={content.indent} level={content.level}>
          <li>
            <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)}/>
          </li>
        </ul>
      );
    case 'ol':
      return (
        <ol indent={content.indent} level={content.level} start={content.start}>
          <li>
            <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => handleChange(e)}/>
          </li>
        </ol>
      );
    case 'img':
      return (
        <div className="imgholder">
          <ImageLoader loading={loading}/>
          <img style={{display: loading ? "none" : "block"}} src={content.src} width={content.width} height={content.height} onLoad={() => setLoading(false)}></img>
        </div>
      )
  }
}

export default ContentBox;
