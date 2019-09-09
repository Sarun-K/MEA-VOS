
export default (chanelList = [], action) => {
    switch (action.type) {
        case 'FECH_CHANEL':
            return action.payload;
        default:
            return chanelList
    }
};