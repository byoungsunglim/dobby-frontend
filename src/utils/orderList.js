export const orderList = (nodes, placeholder) => {
  // console.log(nodes);
  if (nodes.length > 0) {
    let idx = 1;
    let indent = nodes[0].getAttribute("indent");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].className === "list_item") {
        // console.log(nodes[i])
        try {
          if (!nodes[i].parentNode.parentNode.previousSibling.childNodes[1].firstChild.getAttribute('indent')) {
            // console.log("@@@")
            idx = 1;
          }
        }
        catch {
          // console.log("###")
          idx = 1;
        }

        nodes[i].setAttribute("start", idx);
        nodes[i].setAttribute("indent", indent);

        idx++;

        try {
          if (parseInt(indent) > parseInt(nodes[i].parentNode.parentNode.nextSibling.childNodes[1].firstChild.getAttribute('indent'))) {
            // console.log("$$$")
            idx = 1;
          }
        }
        catch {
          // console.log("%%%")
          idx = 1;
        }
      }
      else {
        // console.log(nodes[i])
        nodes[i].firstChild.firstChild.setAttribute("placeholder", indent === "1" ? placeholder[idx - 1] || "" : "");
        nodes[i].setAttribute("start", idx);
        nodes[i].setAttribute("indent", indent);

        idx++;

        if (nodes[i].nextSibling) {
          if (parseInt(indent) > parseInt(nodes[i].nextSibling.getAttribute('indent'))) {
            idx = 1;
          }
        }
      }
    }
  }
  else {
    return;
  }
};
