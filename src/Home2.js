import React, { useState, useRef, useEffect } from "react";
import { Textfit } from "react-textfit";

import tools from "./assets/utils/tools";

import "./assets/css/Home.css";

function Home() {
  const ref_contents = useRef(null);
  // const ref_dtitle = useRef(null);
  // var [num, setNum] = useState(1);
  
  // function element(num) {
  //   var new_element = (
  //     <div ref={ref_contents} className={"contents" + num.toString()}>
  //       <div className={"title" + num.toString()}>
  //         <textarea id="title" placeholder="Title"></textarea>
  //       </div>
  //       <div className={"subtitle" + num.toString()}>
  //         <textarea id="subtitle" placeholder="Subtitle"></textarea>
  //       </div>
  //       <div className={"body" + num.toString()}>
  //         <textarea id="body" placeholder="Body"></textarea>
  //       </div>
  //     </div>
  //   );

  //   return new_element;
  // }
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const ref_title = useRef(null);

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  const handleSubtitle = (new_subtitle) => {
    setSubtitle(new_subtitle);
  }
  const handleBody = (new_body) => {
    setBody(new_body);
  }

  var elements = (
    <div ref={ref_contents} className="contents">
      <textarea id="title" placeholder="Title" defaultValue={title}></textarea>
      <textarea id="subtitle" placeholder="Subtitle" defaultValue={subtitle}></textarea>
      <textarea id="body" placeholder="Body" defaultValue={body}></textarea>
    </div>
  );

  const [contents, setContents] = useState(elements);
  // const [design, setDesign] = useState(null);
  const [canvas, setCanvas] = useState(contents);

  // function addPage() {
  //   setNum(num + 1);
  //   getContents([contents, element(num)]);
  // }

  function getDesign() {
    const t = document.getElementById("title");
    const s = document.getElementById("subtitle");
    const b = document.getElementById("body");

    var dtitle = t.value;
    var dsubtitle = s.value;
    var dbody = b.value;

    setTitle(dtitle);
    setSubtitle(dsubtitle);
    setBody(dbody);

    console.log(ref_contents);

    var dtitle_element = (
      <div className="dtitle">
        <Textfit mode="multi" id="dtitle" style={{ width: "100%", height: "100%" }}>
          {dtitle}
        </Textfit>
      </div>
    );

    if (dtitle.length > 14) {
      var break_idx = dtitle.indexOf("", dtitle.length / 2);
      var first = dtitle.substring(0, break_idx + 1).trim();
      var second = dtitle.substring(break_idx + 1, dtitle.length).trim();
      dtitle_element = (
        <div className="dtitle">
          <Textfit mode="multi" id="dtitle" style={{ width: "100%", height: "100%" }}>
            {first}<br/>{second}
          </Textfit>
        </div>
      );

      console.log(first);
      console.log(second);
    }

    var dsubtitle_element = (
      <div className="dsubtitle">
        <Textfit mode="multi" id="dsubtitle" style={{ width: "100%", height: "100%" }}>
          {dsubtitle}
        </Textfit>
      </div>
    )



    var d_element = [dtitle_element, dsubtitle_element];   

    // console.log(getComputedStyle(title).font);
    // console.log(getTextSize(title.value, getComputedStyle(title).font));

    // console.log(dtitle.props);

    // // setFontSize(
    // //   adjustTextSize(title.value, getComputedStyle(title).font, 50, 50)
    // // );

    // console.log(title.value, subtitle, body);

    // setDesign(d_element);
    setCanvas(d_element);

    // const dtitle = document.getElementById("dtitle");
    // var dtitle_max_width = canvas[0].clientWidth * 0.7;
    // console.log(ref_dtitle);
    // var title_width = getTextSize(dtitle.value, getComputedStyle(dtitle).font)
    setToggleBtn(contentsBtn);
  }

  function getContents () {
    console.log({
      title,
      subtitle,
      body
    })

    console.log(contents);
    setCanvas(contents);
    setToggleBtn(designBtn);
  }

  function getTextSize(text, font) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var tsize = {
      width: context.measureText(text).width,
      height: parseInt(context.font)
    };
    return tsize;
  }

  const designBtn = (
    <button id="designBtn" onClick={getDesign}>
      DESIGN
    </button>
  )

  const contentsBtn = (
    <button id="contentsBtn" onClick={getContents}>
      CONTENTS
    </button>
  )

  const [toggleBtn, setToggleBtn] = useState(designBtn);

  return (
    <div className="home">
      <div className="preview">
        {toggleBtn}
      </div>
      <div className="background-canvas">
        <div className="canvas">{canvas}</div>
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
