import React from 'react';
import Draggable from 'react-draggable';

import "./assets/css/Resizer.css";

function Resizer({}) {
  const handleStart = (e) => {

  }

  const handleDrag = (e) => {
    const window_width = window.innerWidth;
    const navigation_width = document.getElementById("navigation").clientWidth;
    if (e.pageX >= navigation_width && e.pageX <= window_width) {
      document.getElementById("draft").style.width = `${e.pageX - navigation_width}px`;
      document.getElementById("design").style.width = `${window_width - e.pageX}px`;
      document.querySelectorAll("[class=canvas]").forEach((node) => {
        node.style.transform = `scale(${(window_width - e.pageX) / 1920})`;
      });
      
    }
  }

  const handleEnd = (e) => {
    
  }

  return (
    <Draggable
      axis="x"
      allowAnyClick={false}
      handle=""
      defaultPosition={{}}
      position={null}
      scale={1}
      onStart={(e) => handleStart(e)}
      onDrag={(e) => handleDrag(e)}
      onStop={(e) => handleEnd(e)}
    >
      <div id="resizer">
        <div id="handle"></div>
      </div>
    </Draggable>
  );
}

export default Resizer;