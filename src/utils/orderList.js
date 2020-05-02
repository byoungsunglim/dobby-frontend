export const orderList = (draft) => new Promise(function(resolve, reject) {
  var indices = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ]

  for (let i = 0; i < draft.length; i++) {
    if (draft[i].type === 'ol') {
      draft[i].start = indices[draft[i].level - 1][draft[i].indent - 1]++;
    }
    else {
      indices = [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
      ]
    }

    if (i < draft.length - 1) {
      if (draft[i].indent > draft[i+1].indent) {
        indices[draft[i].level - 1][draft[i].indent - 1] = 1;
      }
    }
  }

  resolve(draft);
})