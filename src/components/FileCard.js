import React, { useEffect, useState } from "react";

import Checkbox from "./Checkbox";
import tools from "../utils/tools";

import "../assets/css/FileCard.scss";

function FileCard({ doc }) {  
  function handleClick(e) {}

  return (
    <div className="fileCard" onClick={(e) => handleClick(e)}>
      <Checkbox type={"select"}/>
      <Checkbox type={"important"} is_checked={doc.is_important}/>
      {doc.thumbnail ? 
        <div className="preview">
          <img alt="preview thumbnail" className="preview_thumbnail" src={doc.thumbnail}/>
        </div>
      : 
        <div className="preview_default"/>
      }
      <div className="shared_profiles"></div>
      <div className="file_title">
        <img alt="doc type" className="doc_type" src={tools[`${doc.type}`]}/>
        <span>{doc.title}</span>
      </div>
      <div className="file_functions">
        <button className="file_download">
          <img alt="file download" src={tools.Download}/>
        </button>
        <button className="file_share">
          <img alt="file share" src={tools.Share}/>
        </button>
        <button className="file_etc">
          <img alt="file etc" src={tools.Etc}/>
      </button>
      </div>
    </div>
  );
}

export default FileCard;
