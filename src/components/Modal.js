import React from 'react';
import tools from "../utils/tools";

import "../assets/css/Modal.css";

function Modal({ handleImport, handleModal }) {
  const handleClick = (e) => {
    // console.log(e.target.className, e.currentTarget.id);
    if (e.target.className === "overlay") {
      handleModal();
    }
  }

  return (
    <div className="modalContainer" onClick={(e) => handleClick(e)}>
      <div className="overlay">
      </div>
      <div className="modal">
        <div id="gDrive" onClick={(e) => handleImport(e.currentTarget.id)}>
          <tools.GoogleDrive style={{width: '100%', height: '100%'}}/>
        </div>
        <div id="dBox" onClick={(e) => handleImport(e.currentTarget.id)}>
          <tools.Dropbox style={{width: '100%', height: '100%'}}/>
        </div>
      </div>
    </div>
  )
}

export default Modal;