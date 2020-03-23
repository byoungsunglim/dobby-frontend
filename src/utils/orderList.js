export const orderList = (nodes, placeholder) => {
  // console.log(nodes);
  if (nodes.length > 0) {
    let idx = 1;
    let indent = nodes[0].getAttribute("indent");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].parentNode.setAttribute("start", idx);
      nodes[i].setAttribute("indent", indent);
      nodes[i].firstChild.setAttribute("placeholder", indent === "1" ? placeholder[idx - 1] || "" : "");
      idx++;

      if (nodes[i].parentNode.nextSibling) {
        if (parseInt(indent) > parseInt(nodes[i].parentNode.nextSibling.firstChild.getAttribute('indent'))) {
          idx = 1;
        }
      }
    }
  }
  else {
    return;
  }
};
