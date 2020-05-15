export const getStyle = (blocks) => {
  if (blocks.length === 1) {
    blocks[0][0].style = title[0];
  }
  else if (blocks.length === 2) {
    if (blocks[1].length === 1) {
      blocks[0][0].style = title[0];
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
    marginTop: '20%',
    marginLeft: '15%',
    marginRight: '5%',
    width: '40%',
    maxHeight: '30%',
    fontSize: '84pt',
    overflow: 'hidden'
  },
  {
    // width: '1080px',
    margin: '50px'
  }
]

const style = [
  [
    [
      {
        position: 'absolute',
        top: '80%',
        marginLeft: '15%',
        marginRight: '5%',
        width: '40%',
        textAlign: 'right'
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