import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/InfoMsg.scss";

function InfoMsg({ msg }) {
  function handleClick(e) {
    // console.log(e.target, e.currentTarget);
  };

  return (
    <div className="info_msg" onClick={(e) => handleClick(e)}>
      <div className="info_msg_body">{msg}</div>
      <div className="info_msg_expand">
        <img alt="expand" src={tools.Expand} />
      </div>
      <div className="info_msg_delete">
        <img alt="delete" src={tools.Delete} />
      </div>
    </div>
  );
}

export default InfoMsg;
