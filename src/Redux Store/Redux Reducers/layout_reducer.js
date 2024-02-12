
const initialState={
    activeMode:'code',
    isLoading:false,
    isBar:false,
    isCodeModuleVisible:false,
    isCodeLangModuleVisible:false,
    codeLanguage:'',
    theme:'dark',
    scroll__class:'scroll__dark'
}

export default function(state=initialState,action){
    switch (action.type) {
        case 'SET_ACTIVE_MODE':
            return{...state,activeMode:action.payload}
        case 'TOGGLE_LAYOUT_LOADER':
            return{...state,isLoading:action.payload}
        case 'SET_NODE_SHAPE':
            return{...state,isBar:action.payload}
        case 'TOGGLE_CODE_MODULE':
            return{...state,isCodeModuleVisible:action.payload}
        case 'TOGGLE_CODE_LANG_MODULE':
            return{...state,isCodeLangModuleVisible:action.payload}
        case 'GET_THEME':
            return{...state,theme:action.payload,scroll__class:`scroll__${action.payload}`}
        case 'SET_THEME':
            return{...state,theme:action.payload,scroll__class:`scroll__${action.payload}`}
        case 'GET_CODE_LANGUAGE':
            return{...state,codeLanguage:action.payload}
        case 'SET_CODE_LANGUAGE':
            return{...state,codeLanguage:action.payload}
        default:
            return state;
    }
}