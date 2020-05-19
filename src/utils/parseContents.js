export const parseContents = (draft) => {
  var contents = [];
  var page = [];

  for(let content of draft) {
    if (content.html.length === 0 && content.type !== "img") continue;
    
    if (content.level === 1) {
      if (page.length > 0) {
        contents.push(page);
      }
      page = [content];
    }
    else {
      page.push(content);
    }
  }
  
  if (page.length > 0) {
    contents.push(page);
  }

  return contents;
}