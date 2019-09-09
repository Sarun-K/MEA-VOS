//  reducers
import { combineReducers } from 'redux';

import userList from '../reducers/userList';
import auth from '../reducers/auth';
import chanelList from '../reducers/chanel';
import catList from '../reducers/categories';
import organList from '../reducers/organizations';

const userReducer = (userAuth = null, action) => {
    if(action.type === 'LOGIN'){
        return action.payload;
    }
    else if(action.type === 'LOGOUT'){
        console.log('logout')
    }
    return userAuth;
};



export default combineReducers({
    user: userReducer,
    userList: userList,

    auth: auth,
    chanelList: chanelList,
    catList: catList,
    organList: organList,
});