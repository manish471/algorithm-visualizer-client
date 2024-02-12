import axios from 'axios';

export const getCurrentUser = () => {
    return (dispatch) => {     

      return axios.get('/api/auth/').then(  
        res => dispatch( {type: 'GET_CURRENT_USER',payload: res.data.user}),
        err => dispatch({ type: 'GET_CURRENT_USER', payload: undefined })
      );
    };
};

export const logoutUser = () => {
    return (dispatch) => {     

      return axios.get('/api/auth/logout').then(  
        res => dispatch( {type: 'LOGOUT_USER',payload: undefined}),
        err => dispatch({ type: 'LOGOUT_USER', payload: undefined })
      );
    };
};
