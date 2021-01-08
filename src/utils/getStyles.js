export const getStyles = (blocks) => {
  let styles = [];

  if (blocks.length === 1 || (blocks.length === 2 && blocks[1].length === 1)) {
    return tStyles;
  }
  else {
    styles = [
      {
        marginTop: '75px',
        marginLeft: '75px',
        marginRight: '75px',
        minWidth: 'calc(100% - 150px)',
        maxHeight: '200px'
      },
    ]

    for (let i = 0; i < blocks.length - 1; i ++) {
      if (blocks[0][0].display === 'table') {
        if (blocks.length - 1 <= 4) {
          styles.push({
            // marginTop: '75px',
            marginLeft: '75px',
            marginRight: '75px',
            padding: '25px',
            width: '200px',
            flexGrow: 1
          })
        }
        else if (blocks.length - 1 <= 6) {
          styles.push({
            // marginTop: '75px',
            marginLeft: '75px',
            marginRight: '75px',
            padding: '25px',
            width: '300px',
            flexGrow: 1
          })
        }
        else {
          styles.push({
            // marginTop: '75px',
            marginLeft: '75px',
            marginRight: '75px',
            padding: '25px',
            width: '200px',
            flexGrow: 1
          })
        }
      }
      else {
        styles.push({
          marginTop: '75px',
          marginLeft: '75px',
          marginRight: '75px',
          padding: '25px',
          width: 'calc(100% - 150px)',
          flexGrow: 1
        })
      }
    }

    return styles;
  }

  // if (blocks.length === 1) {
  //   return styles[0][0]
  // }
  // else if (blocks.length === 2) {
  //   if (blocks[1].length === 1) {
  //     return styles[0][0]
  //   }
  //   else {
  //     return styles[blocks.length - 1][0];
  //   }
  // }
  // else {
  //   let diffDepth = diff(blocks.slice(1));
  //   if (diffDepth > 4) {
  //     return styles[blocks.length - 1][0];
  //   }
  //   else {
  //     return styles[blocks.length - 1][1 + Math.floor(Math.random() * (styles[blocks.length - 1].length - 1))];
  //   } 
  // }
}

// const diff = (blocks) => {
//   var minDepth = Infinity;
//   var maxDepth = 0;
//   for (let block of blocks) {
//     if (block.length < minDepth) minDepth = block.length;
//     if (block.length > maxDepth) maxDepth = block.length;
//   }

//   return maxDepth - minDepth;
// }

const tStyles = [
  {
    marginTop: '20%',
    marginLeft: '15%',
    marginRight: '5%',
    width: '40%',
    maxHeight: '30%',
    // overflow: 'hidden'
  },
  {
    marginTop: '30px',
    marginLeft: '15%',
    marginRight: '5%',
    width: '40%',
    maxHeight: '10%',
    // overflow: 'hidden'
  },
]

// const styles = [
//   [ 
//     [
//       {
//         marginTop: '20%',
//         marginLeft: '15%',
//         marginRight: '5%',
//         width: '40%',
//         maxHeight: '30%',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '30px',
//         marginLeft: '15%',
//         marginRight: '5%',
//         width: '40%',
//         maxHeight: '10%',
//         overflow: 'hidden'
//       },
//     ],
//     [

//     ]
//   ],  //제목과 부제목만 있는 경우
//   [ 
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '75px',
//         marginRight: '75px',
//         marginBottom: '75px',
//         maxHeight: 'calc(100% - 300px)',
//         overflow: 'hidden'
//       },
//     ]
//   ], //제목과 블록 1개
//   [ 
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(100% - 200px)',
//         overflow: 'hidden',
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(100% - 200px)',
//         overflow: 'hidden',
//       },
//     ],
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '75px',
//         marginRight: '75px',
//         width: 'calc(50% - 150px)',
//         height: 'calc(100% - 400px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '75px',
//         marginRight: '75px',
//         width: 'calc(50% - 150px)',
//         height: 'calc(100% - 400px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//     ]
//   ], //제목과 블록 2개
//   [
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(100% - 200px)',
//         overflow: 'hidden',
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(100% - 200px)',
//         overflow: 'hidden',
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(100% - 200px)',
//         overflow: 'hidden',
//       },
//     ],
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(33% - 200px)',
//         height: 'calc(100% - 400px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(33% - 200px)',
//         height: 'calc(100% - 400px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(33% - 200px)',
//         height: 'calc(100% - 400px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//     ]
//   ], //제목과 블록 3개
//   [
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '50px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '50px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//     ],
//     [
//       {
//         margin: '75px',
//         maxHeight: '200px',
//         overflow: 'hidden'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '100px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '50px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//       {
//         marginTop: '50px',
//         marginLeft: '100px',
//         marginRight: '100px',
//         width: 'calc(50% - 200px)',
//         height: 'calc(50% - 200px)',
//         overflow: 'hidden',
//         display: 'inline-block'
//       },
//     ],
//   ], //제목과 블록 4개
// ]