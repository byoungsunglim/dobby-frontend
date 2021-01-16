import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Checkbox from "./Checkbox";
import Shared from "./Shared";
import FileFunctions from "./FileFunctions";
import tools from "../utils/tools";

import "../assets/css/FileList.scss";

function FileList({ doc }) {
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    let owner = [
      {
        id: doc.owner,
        role: "owner",
      },
    ];

    setMembers(owner.concat(doc.shared));

    let date = doc.modifiedAt.toDate();
    setDate(
      date.getUTCFullYear() +
        "." +
        ("0" + (date.getUTCMonth() + 1)).slice(-2) +
        "." +
        ("0" + date.getUTCDate()).slice(-2)
    );
  }, [doc]);

  function handleClick(e) {
    // console.log(e.target.className);
    if (e.target.className.includes("doc_click")) {
      history.push(`/doc/${doc.id}`)
    }
  }

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  return (
    <div className="file_list doc_click" onClick={(e) => handleClick(e)}>
      <Checkbox doc_id={doc.id} type="list_select" />
      <Checkbox doc_id={doc.id} type="list_important" is_selected={doc.is_important} />
      <div className="file_list_info doc_click">
        <div className="file_title doc_click">
          <img
            alt="file type"
            className="file_type doc_click"
            src={tools[`${doc.type.capitalize()}`]}
          />
          <span className="doc_click">{doc.title}</span>
        </div>
        <span className="file_modifiedAt doc_click">{date}</span>
      </div>
      <Shared doc={doc} members={members} />
      <FileFunctions />
    </div>
  );
}

export default FileList;
