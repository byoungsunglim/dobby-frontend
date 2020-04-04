export const getImageType = (img) => {
    const canvas = {
        width: 1920,
        height: 1080,
        aspect_ratio: 0.5625,
        min_ratio: 0.25,
        max_ratio: 0.8
    }

    if (img.width >= canvas.width && img.height >= canvas.height) {
        if (img.height / img.width >= canvas.min_ratio && img.height / img.width <= canvas.max_ratio) {
            if (img.height / img.width <= canvas.aspect_ratio) {
                return 0; //'full_width_long'
            }
            else {
                return 1; //'full_height_long'
            }
        }
        else {
            if (img.height / img.width < canvas.min_ratio) {
                return 2; //'width_full'
            }
            else {
                return 3; //'height_full'
            }
        }
    }
    else if (img.width >= canvas.width) {
        return 2; //'width_full'
    }
    else if (img.height >= canvas.height) {
        return 3; //'height_full'
    }
    else if (img.width >= img.height) {
        return 4; //'width_long'
    }
    else {
        return 5; //'height_long'
    }
}
