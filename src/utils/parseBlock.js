export const parseBlock = (draft, id) => {
  var block = [];
  var check = false;

  for(let content of draft) {
    if (content.html.length === 0) continue;
    
    if (content.level === 1) {
      if (check) {
        return block;
      }
      else {
        block = [content];
      }
    }
    else {
      block.push(content);
      if (content.id === id || id === null) {
        check = true;
      }
    }
  }

  return block;
}
