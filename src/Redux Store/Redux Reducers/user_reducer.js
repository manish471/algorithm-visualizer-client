
const initialState={
    user:null,
    isAuthenticated:false
}

export default function(state=initialState,action){
    switch (action.type) {
        case 'GET_CURRENT_USER':
            return{...state,user:action.payload,isAuthenticated:action.payload !== undefined}
        case 'LOGOUT_USER':
            return{...state,isAuthenticated:false}
        default:
            return state;
    }
}