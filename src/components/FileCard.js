import React, { useEffect, useState } from "react";

import Checkbox from "./Checkbox";
import Shared from "./Shared";
import FileFunctions from "./FileFunctions";
import tools from "../utils/tools";

import "../assets/css/FileCard.scss";

function FileCard({ doc }) {  
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    let owner = [{
      id: doc.owner,
      role: 'owner'
    }]

    setMembers(owner.concat(doc.shared));
  }, [doc])

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  return (
    <div className="file_card">
      <Checkbox type="card_select" />
      <Checkbox type="card_important" is_checked={doc.is_important}/>
      {doc.thumbnail ? 
        <div className="preview">
          <img alt="preview thumbnail" className="preview_thumbnail" src={doc.thumbnail}/>
        </div>
      : 
        <div className="preview_default"/>
      }
      <Shared doc={doc} members={members}/>
      <div className="file_title">
        <img alt="file type" className="file_type" src={tools[`${doc.type.capitalize()}`]}/>
        <span>{doc.title}</span>
      </div>
      <FileFunctions />
    </div>
  );
}

export default FileCard;
