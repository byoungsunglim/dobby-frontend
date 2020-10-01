import React, { useEffect, useState } from "react";

import tools from "../utils/tools";

import "../assets/css/FileFunctions.scss";

function FileFunctions({}) {
  function handleClick(e) {
    // console.log(e.target.parentNode.className);
    switch (e.target.parentNode.className) {
      case "file_download":
        break;
      case "file_share":
        break;
      case "file_etc showHide":
        for (let node of document.querySelectorAll("[class~=hideOnOut]")) {
          node.setAttribute("style", "display:none");
        }

        e.target.parentNode.childNodes[1].setAttribute(
          "style",
          "display:visible"
        );
        break;
      default:
    }
  }

  return (
    <div className="file_functions" onClick={(e) => handleClick(e)}>
      <button className="file_download">
        <img alt="file download" src={tools.Download} />
      </button>
      <button className="file_share">
        <img alt="file share" src={tools.Share} />
      </button>
      <button className="file_etc showHide">
        <img alt="file etc" src={tools.Etc} />
        <div className="hideOnOut file_dropdown_wrapper" style={{ display: "none" }}>
          <div className="file_dropdown">
            <div className="file_options">복사</div>
            <div className="file_options">이름변경</div>
            <div className="file_options">삭제</div>
            <div className="file_options">이동</div>
            <div className="file_options">수정</div>
            <div className="file_options">문서정보</div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default FileFunctions;
