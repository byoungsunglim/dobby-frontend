import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/InfoMsg.scss";

function InfoMsg({ msg }) {
  handleClick = (e) => {
    // console.log(e.target, e.currentTarget);
  };

  return (
    <div id="info_msg" onClick={(e) => this.handleClick(e)}>
      <div id="info_msg_body">{msg}</div>
      <div id="info_msg_expand">
        <img alt="expand" src={tools.Expand} />
      </div>
      <div id="info_msg_delete">
        <img alt="delete" src={tools.Delete} />
      </div>
    </div>
  );
}

export default InfoMsg;
