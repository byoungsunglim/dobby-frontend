import { getImageType } from "./getImageType";
import { getFontSize } from "./getFontSize";

export const getStyles = (page, title, imgs, blocks) => {
  if (page === "page_title") {
    if (imgs.length === 0) {
      return title_styles[0][Math.min(blocks.length, 8)];
    }
  }
  else {

  }
  // if (imgs.length === 0) {
  //   return styles[0][Math.min(blocks.length, 8)];
  // }
  // else if (imgs.length === 1) {
  //   if (getImageType(imgs[0]) <= 1) {
  //     return styles[1][0][Math.min(texts.length, 3)];
  //   }
  //   else {
  //     return styles[1][getImageType(imgs[0]) - 1][Math.min(texts.length, 3)];
  //   }
  // }
  // else if (imgs.length === 2) {

  // }
};

const layers = [
  {
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: "0.8",
  }
];

const title_styles = [
  [
    {
      imgs: [],
      texts: []
    }, //이미지 없음 //텍스트 없음
    {
      title: {
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "20%",
          textAlign: "center",
      },
      imgs: [],
      blocks: []
    }, //이미지 없음 //텍스트 제목
    {
      title: {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        width: "70%",
        height: "20%",
        textAlign: "center"
      },
      imgs: [],
      texts: [
        {
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "70%",
          height: "18%",
          textAlign: "center"
        }
      ]
    }, //이미지 없음 //텍스트 제목, 부제목
    {
      title: {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        width: "70%",
        height: "20%",
        textAlign: "center"
      },
      imgs: [],
      texts: [
        {
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "70%",
          height: "18%",
          textAlign: "center"

        },
        {
          top: "90%",
          left: "90%",
          transform: "translate(-90%, -90%)",
          width: "20%",
          height: "20%",
          textAlign: "left"
        },
      ]
    } //이미지 없음 //텍스트 제목, 부제목, 기타
  ], //이미지 없음
  [
    [
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }
          }
        ],
        texts: []
      }, //전체 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          }
        ]
      }, //전체 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "70%",
              height: "10%",
              textAlign: "center",
              color: "white"            
              // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          }
        ]
      }, //전체 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "70%",
              height: "18%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
          {
            // holder: {
              top: "90%",
              left: "90%",
              transform: "translate(-90%, -90%)",
              width: "20%",
              height: "20%",
              textAlign: "left",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
        ]
      } //전체 이미지 //제목, 부제목, 기타
    ], //전체 이미지
    [
      {
        imgs: [
          {
            holder: {
              top: "50%",
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              transform: "translate(0, -50%)",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //전체 가로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          },
          {
            // holder: {
              top: "85%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      } //전체 가로형 이미지 //제목, 부제목, 기타
    ], //전체 가로형 이미지
    [
      {
        imgs: [
          {
            holder: {
              left: "50%",
              padding: 0,
              width: "auto",
              height: "100%",
              transform: "translate(-50%, 0)",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //전체 세로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "50%",
              left: "55%",
              transform: "translate(0, -50%)",
              width: "40%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 세로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "55%",
              transform: "translate(0, -40%)",
              width: "40%",
              height: "20%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "55%",
              transform: "translate(0, -60%)",
              width: "40%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 세로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "55%",
              transform: "translate(0, -40%)",
              width: "40%",
              height: "20%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "55%",
              transform: "translate(0, -60%)",
              width: "40%",
              height: "15%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "55%",
              transform: "translate(0, -75%)",
              width: "40%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      } //전체 세로형 이미지 //제목, 부제목, 기타
    ], //전체 세로형 이미지
    [
      {
        imgs: [
          {
            holder: {
              top: "50%",
              left: "50%",
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "translate(-50%, -50%)",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //가로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          },
          {
            // holder: {
              top: "85%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      } //전체 가로형 이미지 //제목, 부제목, 기타
    ], //전체 가로형 이미지
  ], //이미지 1개
  [
    {
      imgs: [
        {
          holder: {
            margin: 0,
            padding: 0,
            width: "100%",
            display: "inline-block"
          },
          src: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
          },
          layer: layers[0]
        }
      ],
      texts: [
        {
          holder: {
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "20%",
            textAlign: "center"
          },
          src: {
            width: "100%",
            height: "100%",
            color: "white"
          }
        }
      ]
    } //전체 이미지 //제목
  ] //이미지 2개
]

const content_styles = [
  [
    {
      imgs: [],
      texts: []
    }, //이미지 없음 //텍스트 없음
    {
      title: {
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "20%",
          textAlign: "center",
      },
      imgs: [],
      blocks: []
    }, //이미지 없음 //텍스트 제목
    {
      title: {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        width: "70%",
        height: "20%",
        textAlign: "center"
      },
      imgs: [],
      texts: [
        {
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "70%",
          height: "18%",
          textAlign: "center"
        }
      ]
    }, //이미지 없음 //텍스트 제목, 부제목
    {
      title: {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        width: "70%",
        height: "20%",
        textAlign: "center"
      },
      imgs: [],
      texts: [
        {
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "70%",
          height: "18%",
          textAlign: "center"

        },
        {
          top: "90%",
          left: "90%",
          transform: "translate(-90%, -90%)",
          width: "20%",
          height: "20%",
          textAlign: "left"
        },
      ]
    } //이미지 없음 //텍스트 제목, 부제목, 기타
  ], //이미지 없음
  [
    [
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }
          }
        ],
        texts: []
      }, //전체 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          }
        ]
      }, //전체 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "70%",
              height: "10%",
              textAlign: "center",
              color: "white"            
              // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   color: "white"
            // }
          }
        ]
      }, //전체 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              height: "100%",
              display: "inline-block"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            layer: layers[0]
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              width: "70%",
              height: "20%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "70%",
              height: "18%",
              textAlign: "center",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
          {
            // holder: {
              top: "90%",
              left: "90%",
              transform: "translate(-90%, -90%)",
              width: "20%",
              height: "20%",
              textAlign: "left",
              color: "white"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%"
            // }
          },
        ]
      } //전체 이미지 //제목, 부제목, 기타
    ], //전체 이미지
    [
      {
        imgs: [
          {
            holder: {
              top: "50%",
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              transform: "translate(0, -50%)",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //전체 가로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          },
          {
            // holder: {
              top: "85%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      } //전체 가로형 이미지 //제목, 부제목, 기타
    ], //전체 가로형 이미지
    [
      {
        imgs: [
          {
            holder: {
              left: "50%",
              padding: 0,
              width: "auto",
              height: "100%",
              transform: "translate(-50%, 0)",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //전체 세로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "50%",
              left: "55%",
              transform: "translate(0, -50%)",
              width: "40%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 세로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "55%",
              transform: "translate(0, -40%)",
              width: "40%",
              height: "20%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "55%",
              transform: "translate(0, -60%)",
              width: "40%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 세로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              maxWidth: "50%",
              height: "100%",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "40%",
              left: "55%",
              transform: "translate(0, -40%)",
              width: "40%",
              height: "20%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "60%",
              left: "55%",
              transform: "translate(0, -60%)",
              width: "40%",
              height: "15%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "55%",
              transform: "translate(0, -75%)",
              width: "40%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      } //전체 세로형 이미지 //제목, 부제목, 기타
    ], //전체 세로형 이미지
    [
      {
        imgs: [
          {
            holder: {
              top: "50%",
              left: "50%",
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "translate(-50%, -50%)",
              display: "flex"
            },
            src: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }
        ],
        texts: []
      }, //가로형 이미지 //텍스트 없음
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "20%",
              textAlign: "center"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      }, //전체 가로형 이미지 //제목, 부제목
      {
        imgs: [
          {
            holder: {
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: "70%",
              display: "flex"
            },
            src: {
              width: "100%",
              maxHeight: "inherit",
              objectFit: "cover",
            },
          }
        ],
        texts: [
          {
            // holder: {
              top: "75%",
              left: "5%",
              width: "50%",
              height: "20%",
              textAlign: "left",
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            // }
          },
          {
            // holder: {
              top: "75%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          },
          {
            // holder: {
              top: "85%",
              left: "60%",
              width: "35%",
              height: "10%",
              textAlign: "left"
            // },
            // src: {
            //   width: "100%",
            //   height: "100%",
            //   maxFontSize: "2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0"
            // }
          }
        ]
      } //전체 가로형 이미지 //제목, 부제목, 기타
    ], //전체 가로형 이미지
  ], //이미지 1개
  [
    {
      imgs: [
        {
          holder: {
            margin: 0,
            padding: 0,
            width: "100%",
            display: "inline-block"
          },
          src: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
          },
          layer: layers[0]
        }
      ],
      texts: [
        {
          holder: {
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "20%",
            textAlign: "center"
          },
          src: {
            width: "100%",
            height: "100%",
            color: "white"
          }
        }
      ]
    } //전체 이미지 //제목
  ] //이미지 2개
];