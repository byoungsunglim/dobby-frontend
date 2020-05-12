export const parseBlocks = (contents, level) => {
  var blocks = [];
  var block = [];

  for (let content of contents) {
    if (content.level === level) {
      if (block.length > 0) {
        blocks.push(block);
      }
      block = [content];
    }
    else {
      block.push(content);
    }
  }

  if (block.length > 0) {
    blocks.push(block);
  }

  return blocks;
}
