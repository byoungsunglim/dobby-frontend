export const groupTexts = (texts, levels) => {
    var blocks = [];
    var block = []

    const min = Math.min(...levels);
    const max = Math.max(...levels);

    if (min === max) {
        return texts;
    }
    else {
        for (let i = 0; i < levels.length; i++) {
            if (levels[i] > min) {
                block.push(texts[i]);
            }
            else {
                if (block.length > 0) {
                    blocks.push(block);
                    block = [texts[i]];
                }
                else {
                    block.push(texts[i])
                }
            }
        }

        if (block.length > 0) {
            blocks.push(block);
        }
        
        return blocks;
    }
}
