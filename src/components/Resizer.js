import React from 'react';
import Draggable from 'react-draggable';

import "../assets/css/Resizer.css";

function Resizer({}) {
  const handleStart = (e) => {

  }

  const handleDrag = (e) => {
    const window_width = window.innerWidth;
    const navigation_width = document.getElementById("navigation").clientWidth;
    const design_width = window_width - e.pageX - 20;
    if (e.pageX >= navigation_width && e.pageX <= window_width) {
      document.getElementById("draft").style.width = `${e.pageX - navigation_width}px`;
      document.getElementById("design").style.width = `${design_width}px`;
      document.querySelectorAll("[class=canvas]").forEach((node, idx) => {
        node.style.transform = `scale(${(design_width - 6  * (design_width)/1920) / 1920}) translate(0, ${idx * (-1080 * 1920 / (design_width - 6 * (design_width)/1920) + 1080 + 20)}px)`;
      });
    }

    if (e.pageX - navigation_width < 200) {
      document.getElementById("toolbar").style.visibility = 'hidden';
    }
    else if (e.pageX - navigation_width < 500) {
      document.getElementById("toolbar").style.visibility = 'visible';
      document.getElementById("toolbar").style.width = '150px';
    }
    else {
      document.getElementById("toolbar").style.visibility = 'visible';
      document.getElementById("toolbar").style.width = '450px';
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