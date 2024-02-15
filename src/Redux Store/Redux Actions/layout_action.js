export function setActiveMode(mode){
    return{
        type:'SET_ACTIVE_MODE',
        payload:mode
    }
}

export function toggleLoader(val){
    return{
        type:'TOGGLE_LAYOUT_LOADER',
        payload:val
    }
}

export function setNodeShape(val){
    return{
        type:'SET_NODE_SHAPE',
        payload:val
    }
}

export function toggleCodeModule(val){
    return{
        type:'TOGGLE_CODE_MODULE',
        payload:val
    }
}

export function toggleCodeLangModule(val){
    return{
        type:'TOGGLE_CODE_LANG_MODULE',
        payload:val
    }
}

export function getTheme(){
    let theme = window.localStorage.getItem('theme');
    if(theme === undefined)
        window.localStorage.setItem('theme','dark');
    return{
        type:'GET_THEME',
        payload:theme
    }
}

export function setTheme(theme){
    window.localStorage.setItem('theme',theme);
    return{
        type:'GET_THEME',
        payload:'dark'
    }
}

export function getCodeLanguage(){
    let lang = window.localStorage.getItem('lang');
    return{
        type:'GET_CODE_LANGUAGE',
        payload:'Javascript'
    }
}

export function setCodeLanguage(lang){
    window.localStorage.setItem('lang',lang);
    return{
        type:'SET_CODE_LANGUAGE',
        payload:lang
    }
}