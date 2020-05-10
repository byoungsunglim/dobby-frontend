export const parseBlocks = (contents) => {
  var blocks = [];
  var levels = [];
  var counter = [0,0,0,0,0];
  for (let content of contents) {
    levels.push(content.level);
    counter[content.level - 2] += 1;
  }
  const parent_level = counter.findIndex(level => level > 0) + 2;
  console.log(parent_level)

  console.log(levels, counter);

  return blocks;
}
