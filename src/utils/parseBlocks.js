export const parseBlocks = (contents) => {
  var blocks = [];
  var levels = [];
  var counter = [0,0,0,0,0];
  for (let content of contents) {
    levels.push(content.level);
    counter[content.level - 2] += 1;
  }

  console.log(levels, counter);

  return blocks;
}
