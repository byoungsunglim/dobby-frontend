export const getTextHeights = (style, texts) => {
    const text_ratio = {
        h1: 4,
        h2: 3,
        h3: 2,
        p: 1
    }
    
    var sum = 0;
    for (let text of texts) {
        // console.log(text);
        sum += text_ratio[text.type];
    }
    // console.log(sum);
    var ratio = Math.floor(100 / sum);
    // console.log(ratio);

    var heights = [];
    for (let text of texts) {
        let size = text_ratio[text.type] * ratio;
        heights.push(`${size}%`)
    }

    return heights;
}
