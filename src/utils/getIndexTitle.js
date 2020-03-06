import { getTabSpacing } from './getTabSpacing';

export const getIndexTitle = (id, title) => {
    let spacing = getTabSpacing(id);

    return spacing + id + '. ' + title
}
