export const getTextStyle = (id, preText, selText, postText) => {
  let style = id.split("_")[2];
  let text = preText + selText + postText;
  let tag_open = "";
  let tag_close = "";
  let list_open = "";
  let list_close = "";
  let new_html = "";
  
  if (text.includes("</ul>")) {
    list_open = text.split("<li>")[0] + "<li>";
    list_close = "</li></ul>";

    console.log(list_open, list_close);
  }
  else if (text.includes("</ol>")) {

  }

  if (style === 'underline' || style === 'highlight') {
    tag_open = new RegExp(`<span id="${style}">`, 'gim');
    tag_close = new RegExp(`</span>`, 'gim');
    if (selText.includes(`<span id="${style}">`)) {
      new_html = preText + selText.replace(tag_open, "").replace(tag_close, "") + postText;
    }
    else {
      new_html =  preText + `<span id=${style}>` + selText + `</span>` + postText;
    }
  }
  else {
    let tag = style.substring(0, 1);
    tag_open = new RegExp(`<${tag}>`, 'gim');
    tag_close = new RegExp(`</${tag}>`, 'gim');
    if (selText.includes(`<${tag}>`)) {
      new_html = preText + selText.replace(tag_open, "").replace(tag_close, "") + postText;
    }
    else {
      new_html = preText + `<${tag}>` + selText + `</${tag}>` + postText;
    }
  }

  return list_open + new_html.replace(new RegExp(list_open, 'gim'), "").replace(new RegExp(list_close, 'gim'), "") + list_close;
}