export default (organList = [], action) => {
    switch (action.type) {
        case 'FECH_ORGAN':
            return action.payload;
        default:
            return organList
    }
};