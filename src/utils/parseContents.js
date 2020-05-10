export const parseContents = (draft, id) => {
  var contents = [];
  var levels = [];
  var check = false;

  for(let content of draft) {
    if (content.html.length === 0) continue;
    
    if (content.level === 1) {
      if (check) {
        return [contents, levels];
      }
      else {
        contents = [content];
        levels = [content.level];
      }
    }
    else {
      contents.push(content);
      levels.push(content.level)
      if (content.id === id || id === null) {
        check = true;
      }
    }
  }

  return [contents, levels];
}