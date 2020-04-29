import { getImageType } from "./getImageType";

export const getImageStyles = (imgs) => {
    let img_styles = [];
    switch (imgs.length) {
        case 1:
            img_styles.push(ImageStyle[0][getImageType(imgs[0])]);
            return img_styles;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
    }
}

const ImageStyle = [
    [
        {
            margin: 0,
            padding: 0,
            width: '100%',
            display: 'inline-block'
        }, //full_width_long
        {
            margin: 0,
            padding: 0,
            height: '100%',
            display: 'inline-block'
        }, //full_height_long
        {
            marginTop: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            maxHeight: '65%',
            display: 'inline-block'
        }, //width_full
        {
            margin: 0,
            padding: 0,
            height: '100%',
            maxWidth: '50%',
            display: 'inline-block'
        }, //height_full
        {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            display: 'inline-block'
        }, //width_long
        {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            display: 'inline-block'
        }, //height_long
    ] // 1 image
]
