import React, { useEffect, useState } from "react";

import Checkbox from "./Checkbox";
import Shared from "./Shared";
import FileFunctions from "./FileFunctions";
import tools from "../utils/tools";

import "../assets/css/FileList.scss";

function FileList({ doc }) {
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

  function handleClick(e) {}

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  return (
    <div className="file_list" onClick={(e) => handleClick(e)}>
      <Checkbox type="list_select" />
      <Checkbox type="list_important" is_checked={doc.is_important} />
      <div className="file_list_info">
        <div className="file_title">
          <img
            alt="file type"
            className="file_type"
            src={tools[`${doc.type.capitalize()}`]}
          />
          <span>{doc.title}</span>
        </div>
        <span className="file_modifiedAt">{date}</span>
      </div>
      <Shared doc={doc} members={members} />
      <FileFunctions />
    </div>
  );
}

export default FileList;
