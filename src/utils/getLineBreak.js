export const getLineBreak = (type, string) => {
    switch (type) {
        case "title":
            if (string.length > 14 && string.indexOf(" ") > 0) {
                var break_idx = string.indexOf(" ", string.length / 2 - 1);
                var first = string.substring(0, break_idx + 1).trim();
                var second = string.substring(break_idx + 1, string.length).trim();
                
                return [first, second];
            }
            else {
                return [string];
            }
        case "subtitle":
        case "body":
        default:
    }
}
