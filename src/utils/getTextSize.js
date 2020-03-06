function getTextSize(txt, font) {
    // this.element = document.createElement('canvas');
    // this.context = this.element.getContext("2d");
    // this.context.font = font;
    // var tsize = {'width':this.context.measureText(txt).width, 'height':parseInt(this.context.font)};
    // return tsize;

    var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(txt);
    return metrics.width;
}