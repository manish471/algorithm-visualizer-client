
const initialState={
    code:[],
    output:{},
    codeString:"",
    isLoading:false,
    autoSaveLoader:false,
    currentCodeData:{},
    error:[],
    codeList:[],
}

export default function(state=initialState,action){
    switch (action.type) {
        case 'GET_CURRENT_CODE':
            return{...state,currentCodeData:action.payload}
        case 'SET_CURRENT_CODE':
            return{...state,currentCodeData:action.payload}
        case 'UPDATE_CURRENT_CODE':
            return{...state,currentCodeData:action.payload}
        case 'DELETE_CODE':
            return{...state,codeList:action.payload.filteredCodeList,currentCodeData:action.payload.currentCodeData}
        case 'START_AUTO_SAVE_LOADER':
            return{...state,autoSaveLoader:action.payload}
        case 'AUTO_SAVE_CODE':
            return{...state,autoSaveLoader:action.payload}
        case 'EXECUTE_CODE':
            return{...state,code:action.payload.code,codeString:action.payload.codeString,output:action.payload.output}
        case 'TOGGLE_CODE_LOADER':
            return{...state,isLoading:action.payload}
        case 'SET_DS_INFO':
            return{...state,currentCodeData:action.payload}
        case 'SET_ERROR':
            return{...state,error:[...state.error,action.payload]}
        case 'GET_CODE_LIST':
            return{...state,codeList:action.payload}
        case 'ADD_NEW_CODE':
            return{...state,codeList:[...state.codeList,action.payload]}
        default:
            return state;
    }
}