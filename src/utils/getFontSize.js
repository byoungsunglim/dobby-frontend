export const getFontSize = (style, texts) => {
    const text_ratio = {
        h1: 6,
        h2: 5,
        h3: 4,
        p: 3
    }
    
    var sum = 0;
    for (let text of texts) {
        console.log(text);
        sum += text_ratio[text.type];
    }
    console.log(sum);
    var ratio = Math.floor(parseInt(style.height) / sum);
    console.log(ratio);

    var fontSizes = [];
    for (let text of texts) {
        let size = (text_ratio[text.type] * ratio) * (9 / 16);
        fontSizes.push(`${size}vw`)
    }

    return fontSizes;
}
