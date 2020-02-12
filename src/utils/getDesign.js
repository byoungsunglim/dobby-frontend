import { Textfit } from "react-textfit";
import React from "react";

import { getLineBreak } from './getLineBreak.js';

export const getDesign = (contents) => {
  let design = null;
  
  switch (contents.page) {
    case 0:
      let title = contents.title.split("\n");
      let subtitle = contents.subtitle.split("\n");
      let body = contents.body.split("\n");
    
      let dt = [];
      let ds = [];
      let db = [];
    
      title.forEach((t) => {
        if (t.length > 30) {
          alert("제목이 너무 깁니다");
          //TODO: case check
        }
        else {
          let elements = getLineBreak('title', t)
          for (let i = 0; i < elements.length; i++) {
            dt.push(elements[i]);
            if (i < elements.length - 1) {
              dt.push(<br></br>);
            }
          }
        }
      })
    
      for (let j = 0; j < subtitle.length; j++) {
        ds.push(subtitle[j]);
        if (j < subtitle.length - 1) {
          ds.push(<br></br>);
        }
      }
    
      for (let k = 0; k < body.length; k++) {
        db.push(body[k]);
        if (k < body.length - 1) {
          db.push(<br></br>);
        }
      }

      design = [
        <div className={`dtitle_${contents.page}`}>
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {dt}
          </Textfit>
        </div>,
        <div className={`dsubtitle_${contents.page}`}>
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {ds}
          </Textfit>
        </div>,
        <div className={`dbody_${contents.page}`}>
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {db}
          </Textfit>
        </div>
      ]
      break;
    case 1:
      
    default:  
  }

  return design;
}
