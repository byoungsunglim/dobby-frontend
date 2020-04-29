import React from "react";
import ContentEditable from "react-contenteditable";
import { Textfit } from "react-textfit";

import TextBox from "./TextBox";
import { getLineBreak } from "./getLineBreak";
import { parseContent } from "./parseContent";
import { groupTexts } from "./groupTexts";
import { getStyles } from "./getStyles";
import { addLineBreak } from "./addLineBreak";
import { getFontSize } from "./getFontSize";
import { getTextHeights } from "./getTextHeight";

export const getDesign = (props) => {
  const { cur_page, draft, setDraft, setDesign } = props;
  const content = draft[draft.findIndex(page => page.id === cur_page)];
  console.log(content);
  var design = [];
  // var title = content[0];
  // var [imgs, texts, levels] = parseContent(content.slice(1));
  // var blocks = groupTexts(texts, levels); //TODO: division algorithm for more than 8 blocks 
  // console.log(title, imgs, blocks);
  
  // if (page === "page_title") {
    // let styles = getStyles(page, title, imgs, blocks);
    // console.log(styles);

    // for (let i = 0; i < imgs.length; i++) {
    //   design.push(
    //     <div className='imgbox' style={styles.imgs[i].holder}>
    //       <img
    //         src={imgs[i].src}
    //         alt=""
    //         style={styles.imgs[i].src}
    //       ></img>
    //     </div>
    //   );
    //   if (styles.imgs[i].layer) {
    //     design.push(
    //       <div className="layer" style={styles.imgs[i].layer}></div>
    //     )
    //   }
    // }

    // let etc = [];
    // for (let j = 0; j < texts.length; j++) {
    //   if (j < styles.texts.length - 1) {
    //     let block = [];
    //     let heights = getTextHeights(styles.texts[j], texts[j]);
    //     console.log(heights)
    //     for (let k = 0; k < texts[j].length; k++) {
    //       block.push(
    //         <TextBox text={texts[j][k]} style={{width: "100%", height: heights[k]}} page={page} content={content} setDocument={props.setDocument}/>
    //       )
    //     }

    //     design.push(
    //       <div className="textblock" style={styles.texts[j]}>
    //         {block}
    //       </div>
    //     )
    //     // design.push(
    //     //   <TextBox html={"test"} disabled={false} style={}/>
    //       // <div className="textbox" style={styles.texts[j].holder}>
    //       //   <Textfit max={300} style={styles.texts[j].src}>
    //       //     {addLineBreak(texts[j])}
    //       //   </Textfit>
    //       // </div>
    //     // )
    //   }
    //   else {
    //     for (let text of texts[j]) {
    //       etc.push(text);
    //     }
    //   }

    //   if (j === texts.length - 1 && etc.length > 0) {
    //     console.log(etc);
    //     let block = [];
    //     let heights = getTextHeights(styles.texts[j], etc);
    //     console.log(heights)
    //     for (let l = 0; l < etc.length; l++) {
    //       block.push(
    //         <TextBox text={etc[l]} style={{width: "100%", height: heights[l]}} page={page} content={content} setDocument={props.setDocument}/>
    //       )
    //     }

    //     console.log(block);

      //   design.push(
      //     <div className="textblock" style={styles.texts[styles.texts.length - 1]}>
      //       {block}
      //     </div>
      //   )
      // }
    // }

    // console.log(styles);

    // imgs.forEach((img, idx) => {
    //   design.push(
    //     <div style={styles[idx]}>
    //       <img src={img.src} alt="img_background" style={{width: '100%', height: '100%', objectFit: 'iiiiii'}}></img>
    //     </div>
    //   )
    // })
  
    // title.forEach((t) => {
    //   if (t.length > 30) {
    //     alert("제목이 너무 깁니다");
    //     //TODO: case check
    //   }
    //   else {
    //     let elements = getLineBreak('title', t)
    //     for (let i = 0; i < elements.length; i++) {
    //       dt.push(elements[i]);
    //       if (i < elements.length - 1) {
    //         dt.push(<br></br>);
    //       }
    //     }
    //   }
    // })
  
    // for (let j = 0; j < subtitle.length; j++) {
    //   ds.push(subtitle[j]);
    //   if (j < subtitle.length - 1) {
    //     ds.push(<br></br>);
    //   }
    // }
  
    // for (let k = 0; k < body.length; k++) {
    //   db.push(body[k]);
    //   if (k < body.length - 1) {
    //     db.push(<br></br>);
    //   }
    // }
    // console.log(document.getElementById('canvas')..offsetWidth);

    // design = [
    //   <TextBox html={"test"} disabled={false} style={{
    //     width: "calc(70vw * 0.8 * 0.3)",
    //     // height: "calc(70vw * 0.8 * 0.5625 * 0.3)",
    //     fontSize: "6vw",
    //   }}/>
    // ];
  // }
  // else {
    // let title = contents.title.split("\n");
    // let subtitle = contents.subtitle.split("\n");
    // let body = contents.body.split("\n");
  
    // let dt = [];
    // let ds = [];
    // let db = [];
  
    // title.forEach((t) => {
    //   if (t.length > 30) {
    //     alert("제목이 너무 깁니다");
    //     //TODO: case check
    //   }
    //   else {
    //     let elements = getLineBreak('title', t)
    //     for (let i = 0; i < elements.length; i++) {
    //       dt.push(elements[i]);
    //       if (i < elements.length - 1) {
    //         dt.push(<br></br>);
    //       }
    //     }
    //   }
    // })
  
    // for (let j = 0; j < subtitle.length; j++) {
    //   ds.push(subtitle[j]);
    //   if (j < subtitle.length - 1) {
    //     ds.push(<br></br>);
    //   }
    // }
  
    // for (let k = 0; k < body.length; k++) {
    //   db.push(body[k]);
    //   if (k < body.length - 1) {
    //     db.push(<br></br>);
    //   }
    // }

    // design = [
    //   <div className={`dtitle_${content.page}`}>
    //     <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //       {dt}
    //     </Textfit>
    //   </div>,
    //   <div className={`dsubtitle_${content.page}`}>
    //     <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //       {ds}
    //     </Textfit>
    //   </div>,
    //   <div className={`dbody_${content.page}`}>
    //     <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //       {db}
    //     </Textfit>
    //   </div>
    // ]
  // }
  

  return design;
}
