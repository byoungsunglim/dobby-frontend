import React from "react";

export const parseContent = (content) => {
    var imgs = [];
    var texts = [];
    var block = [];
    // console.log(contents);
    for (let body of content) {
        // console.log(content);
        let div = document.createElement('div');
        div.innerHTML = body.html;
        // let html = div.innerHTML.replace(/&amp;/g, '&').replace(/&nbsp;/g, ''); //TODO: unescape issues with different characters...
        // let text = {
        //     id: body.id,
        //     type: body.type,
        //     html: html
        // }
        if (body.html.length === 0) {
            continue;
        }
        else if (body.html.includes('img')) {
            let img = {
                id: div.firstChild.firstChild.id,
                src: div.firstChild.firstChild.src,
                width: div.firstChild.firstChild.width,
                height: div.firstChild.firstChild.height
            }
            imgs.push(img);
            div.remove();
        }
        else if (body.type === "h1") {
            if (block.length > 0) {
                texts.push(block);
            }
            texts.push([body]);
        }
        else if (body.type === "h2") {
            if (block.length > 0) {
                texts.push(block);
                block = [];
            }
            block.push(body);
        }
        else {
            block.push(body);
        }
    }
    if (block.length > 0) {
        texts.push(block)
    }

    return [imgs, texts];
}
