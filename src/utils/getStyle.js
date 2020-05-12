export const getStyle = (blocks) => {
  if (blocks.length === 1) {
    blocks[0].style = title[0];
  }
  else if (blocks.length === 2) {
    if (blocks[1].length === 1) {
      blocks[0].style = title[0];
      blocks.slice(1).map((block, i) => {
        block.map((content, j) => {
          content.style = style[0][i][j];
        })
      })
    }
    else if (blocks[1].length === 2) {
      
    }
    else if (blocks[1].length === 3) {
      
    }
    else if (blocks[1].length === 4) {
      
    }
  }
  else if (blocks.length === 3) {
    
  }
  else if (blocks.length === 4) {
    
  }
  else if (blocks.length === 5) {
    
  }

  return blocks;
}

export const putStyle = (blocks) => {
  for (let block of blocks) {

  }
}

const title = [
  {
    marginTop: '10px',
    marginLeft: '10px'
  }
]

const style = [
  [
    [
      {
        top: '10%',
        left: '10%',
      }
    ], //블록 1개 컨텐트 1개
    [
      {
        top: '10%',
        left: '10%',
      },
      {
        top: '10%',
        left: '10%',
      }
    ], //블록 1개 컨텐트 2개
  ], //블록 1개
]