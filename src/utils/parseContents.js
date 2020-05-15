export const parseContents = (draft, id) => {
  var contents = [];
  var levels = [];
  var counter = [0,0,0,0,0];
  var check = false;

  for(let content of draft) {
    if (content.html.length === 0) continue;
    
    if (content.level === 1) {
      if (check) {
        return [contents, levels, counter];
      }
      else {
        contents = [content];
        levels = [content.level];
        counter[content.level - 1] += 1;
        if (content.id === id || id === null) {
          check = true;
        }
      }
    }
    else {
      contents.push(content);
      levels.push(content.level);
      counter[content.level - 1] += 1;
      if (content.id === id || id === null) {
        check = true;
      }
    }
  }

  return [contents, levels, counter];
}