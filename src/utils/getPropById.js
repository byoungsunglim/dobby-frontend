export const getPropById = (id, key, prop) => {
    for (let i = 0; i < prop.length; i++) {
        if (prop[i].id === id) {
            return prop[i][key];
        }
    }

    return null;
}
