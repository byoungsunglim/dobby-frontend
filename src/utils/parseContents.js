export const parseContents = (draft, id) => {
  var contents = [];
  var check = false;

  for(let content of draft) {
    if (content.html.length === 0) continue;
    
    if (content.level === 1) {
      if (check) {
        return contents;
      }
      else {
        contents = [content];
      }
    }
    else {
      contents.push(content);
      if (content.id === id || id === null) {
        check = true;
      }
    }
  }

  return contents;
}