export const getTabSpacing = (id) => {
    let spacing = "";
    for (let tab = 0; tab < id.replace(".", "").length - 1; tab++) {
        spacing += "\t";
    }

    return spacing;
}
