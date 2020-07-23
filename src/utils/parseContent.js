export const parseContent = (content) => {
    var imgs = [];
    var texts = [];
    var levels = [];
    for (let body of content) {
        let div = document.createElement('div');
        div.innerHTML = body.html;

        if (div.innerHTML.includes('img')) {
            let img = {
                id: div.firstChild.firstChild.id,
                src: div.firstChild.firstChild.src,
                width: div.firstChild.firstChild.width,
                height: div.firstChild.firstChild.height,
            }
            imgs.push(img);
            div.remove();
        }
        else if (div.innerText.trim().length === 0) {
            continue;
        }
        else {
            levels.push(parseInt(body.type.substring(1)));
            texts.push(body);
        }
        // else if (body.type === "h1") {
        //     if (block.length > 0) {
        //         texts.push(block);
        //     }
        //     texts.push([body]);
        // }
        // else if (body.type === "h2") {
        //     if (block.length > 0) {
        //         texts.push(block);
        //         block = [];
        //     }
        //     block.push(body);
        // }
        // else {
        //     block.push(body);
        // }
    }
    // if (block.length > 0) {
    //     texts.push(block)
    // }



    return [imgs, texts, levels];
}
