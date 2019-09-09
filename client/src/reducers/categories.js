export default (catList = [], action) => {
    switch (action.type) {
        case 'FECH_CAT':
            return action.payload;
        default:
            return catList
    }
};