export const orderList = (nodes, placeholder) => {
  var indices;
  // console.log(nodes);
  if (nodes.length > 0) {
    if (nodes[0].className === "list_item") {
      indices = [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
      ]
      for (let i = 0; i < nodes.length; i++) {
        // console.log(nodes[i]);
        let type = parseInt(nodes[i].parentNode.getAttribute("type").substring(1)) - 1;
        let indent = parseInt(nodes[i].getAttribute("indent")) - 1;
        // console.log(type, indent);

        if (nodes[i].parentNode.parentNode.previousSibling) {
          if (nodes[i].parentNode.parentNode.previousSibling.childNodes[1].innerHTML.includes("</li>")) {
            let prev_tag = nodes[i].parentNode.parentNode.previousSibling.childNodes[1].firstChild.tagName;
            let prev_type = parseInt(nodes[i].parentNode.parentNode.previousSibling.childNodes[1].getAttribute("type").substring(1)) - 1;
            let prev_indent = parseInt(nodes[i].parentNode.parentNode.previousSibling.childNodes[1].firstChild.getAttribute("indent")) - 1;

            if (prev_tag === "UL" || type !== prev_type || indent > prev_indent) {
              indices[type][indent] = 1;
            }
          }
          else {
            indices = [
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
            ];
          }
        }
    
        nodes[i].setAttribute('start', indices[type][indent]++);

        if (nodes[i].parentNode.parentNode.nextSibling) {
          if (nodes[i].parentNode.parentNode.nextSibling.childNodes[1].innerHTML.includes("</li>")) {
            let next_tag = nodes[i].parentNode.parentNode.nextSibling.childNodes[1].firstChild.tagName;
            let next_type = parseInt(nodes[i].parentNode.parentNode.nextSibling.childNodes[1].getAttribute("type").substring(1)) - 1;
            let next_indent = parseInt(nodes[i].parentNode.parentNode.nextSibling.childNodes[1].firstChild.getAttribute("indent")) - 1;

            if (next_tag === "UL" || type !== next_type || indent > next_indent) {
              indices[type][indent] = 1;
            }
          }
          else {
            indices = [
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1],
            ];
          }
        }
      }
    }
    else {
      indices = [1, 1, 1];

      for (let i = 0; i < nodes.length; i++) {
        // console.log(nodes[i]);
        let indent = parseInt(nodes[i].getAttribute("indent")) - 1;
        // console.log(type, indent);

        if (nodes[i].previousSibling) {
          if (nodes[i].previousSibling.innerHTML.includes("</li>")) {
            let prev_indent = parseInt(nodes[i].previousSibling.getAttribute("indent")) - 1;

            if (indent > prev_indent) {
              indices[indent] = 1;
            }
          }
        }

        nodes[i].firstChild.firstChild.setAttribute("placeholder", indent === 0 ? placeholder[indices[0] - 1] || "" : "");
        nodes[i].setAttribute('start', indices[indent]++);

        if (nodes[i].nextSibling) {
          if (nodes[i].nextSibling.innerHTML.includes("</li>")) {
            let next_indent = parseInt(nodes[i].nextSibling.getAttribute("indent")) - 1;

            if (indent > next_indent) {
              indices[indent] = 1;
            }
          }
        }
      }
    }
    // let idx = 1;
    // let indent = nodes[0].getAttribute("indent");
    // let type = nodes[0].parentNode.getAttribute("type");
    // for (let i = 0; i < nodes.length; i++) {
    //   if (nodes[i].className === "list_item") {
    //     // console.log(nodes[i])
    //     try {
    //       if (!nodes[i].parentNode.parentNode.previousSibling.childNodes[1].firstChild.getAttribute('indent')) {
    //         // console.log("@@@")
    //         idx = 1;
    //       }
    //     }
    //     catch {
    //       // console.log("###")
    //       idx = 1;
    //     }

    //     nodes[i].setAttribute("start", idx);
    //     nodes[i].setAttribute("indent", indent);

    //     idx++;

    //     try {
    //       if (parseInt(indent) > parseInt(nodes[i].parentNode.parentNode.nextSibling.childNodes[1].firstChild.getAttribute('indent')) || type !== nodes[i].parentNode.parentNode.nextSibling.childNodes[1].getAttribute('type')) {
    //         // console.log("$$$")
    //         idx = 1;
    //       }
    //     }
    //     catch {
    //       // console.log("%%%")
    //       idx = 1;
    //     }
    //   }
    //   else {
    //     // console.log(nodes[i])
    //     nodes[i].firstChild.firstChild.setAttribute("placeholder", indent === "1" ? placeholder[idx - 1] || "" : "");
    //     nodes[i].setAttribute("start", idx);
    //     nodes[i].setAttribute("indent", indent);

    //     idx++;

    //     if (nodes[i].nextSibling) {
    //       if (parseInt(indent) > parseInt(nodes[i].nextSibling.getAttribute('indent'))) {
    //         idx = 1;
    //       }
    //     }
    //   }
    // }
  }
  else {
    return;
  }
};