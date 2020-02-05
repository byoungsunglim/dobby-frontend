import React, { Component } from "react";
import { Textfit } from "react-textfit";

function getDesign() {
    const t = document.getElementById("title").value;
    const s = document.getElementById("subtitle").value;
    const b = document.getElementById("body").value;

    var dt = (
      <div className="dtitle">
        <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
          {t}
        </Textfit>
      </div>
    );

    if (t.length > 14) {
      var break_idx = t.indexOf("", t.length / 2);
      var first = t.substring(0, break_idx + 1).trim();
      var second = t.substring(break_idx + 1, t.length).trim();
      dt = (
        <div className="dtitle">
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {first}<br/>{second}
          </Textfit>
        </div>
      );

      console.log(first);
      console.log(second);
    }

    var ds = (
      <div className="dsubtitle">
        <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
          {s}
        </Textfit>
      </div>
    )

    this.design = [dt, ds];

    this.setState({
      title: t,
      subtitle: s,
      body: b,

      canvas: this.design,
      toggleBtn: this.contentsBtn
    });
}