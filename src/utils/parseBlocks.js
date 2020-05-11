export const parseBlocks = (contents, levels, counter, parent_level) => {
  var children = [];

  for (let i = 0; i < contents.length; i++) {
    if (contents[i].level > parent_level) {
      children.push(contents[i]);
    }
    else {
      return {
        parent: contents[i],
        children: parseBlocks(contents.slice(i), levels, counter, contents[i].level)
      }
    }
  }

  return {
    parent: contents[0],
    children: parseBlocks(children, levels, counter, contents[0].level)
  }
}
