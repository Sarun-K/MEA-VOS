// action creator
import endPoint from '../apis/index';
import auth from '../reducers/auth';


export const signIn = (obj) => async dispatch => {
    const response = await endPoint.post('/users/authenticate', obj);
    console.log('error message',response.data.status);
    if(response.data.status === 'error'){
        dispatch({ type: 'SIGN_IN', 
        payload: []})
    }
    else{
        dispatch({ type: 'SIGN_IN', 
    payload: { 
        token: response.data.data.token, 
        username: response.data.data.user.username,
        role: response.data.data.user.role,
        id: response.data.data.user._id
    } })
    }
    
};

export const signOut = () => {

    return{
        type: 'SIGN_OUT',
        payload:{...auth, auth:[]}
    };
};
/////////////////////////////////

export const fechChanel = () => async dispatch => {
    const response = await endPoint.get('/fech/chanel', );
    dispatch({ type: 'FECH_CHANEL', 
    payload: {name: response.data} 
     })
};

export const fechCat = () => async dispatch => {
    const response = await endPoint.get('/fech/cetegories', );
    dispatch({ type: 'FECH_CAT', 
    payload: response.data
     })
};

export const fechOrgan = () => async dispatch => {
    const response = await endPoint.get('/fech/organizations', );
    dispatch({ type: 'FECH_ORGAN', 
    payload: response.data
     })
};
////////////////////////////////////////////////////////////
export const fetchUser = () => async dispatch => {
    const response = await endPoint.get('/users/get')

    dispatch({ type: 'FETCH_USERS', payload: response.data })
};
    
