import React from "react";

import tools from "./assets/utils/tools.js";

import "./assets/css/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="background-canvas">
        <div className="canvas">
          <div className="contents">
            <div className="title" contentEditable="true"></div>
            <div className="subtitle" contentEditable="true"></div>
            <div className="body" contentEditable="true"></div>
          </div>
        </div>
      </div>
      <div className="insert-toolbar">
        <tools.Image className="tools" />
        <tools.Video className="tools" />
        <tools.Table className="tools" />
        <tools.Graph className="tools" />
        <tools.Pagination className="tools" />
        <tools.Highlight className="tools" />
        <tools.Capture className="tools" />
        <tools.Etc className="tools" />
      </div>
    </div>
  );
}

export default Home;
