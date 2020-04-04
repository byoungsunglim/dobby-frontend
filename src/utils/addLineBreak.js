import React from "react";

export const addLineBreak = (array) => {
    var new_array = [];
    for (let i = 0; i < array.length; i++) {
        if (i > 0) {
            new_array.push(<br></br>);
        }
        new_array.push(array[i])
    }
    
    return new_array;
}
