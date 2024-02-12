import axios from 'axios';

export function getCurrentCode(lang){
  return (dispatch) => {     

    return axios.get(`/api/code?lang=${lang}`).then(  
      res => dispatch( {type: 'GET_CURRENT_CODE',payload: res.data.data}),
      err => dispatch({ type: 'GET_CURRENT_CODE', payload: err })
    );
  };
}

export function setCurrentCode(prev_code,updatedCode){
  let currentCodeData = prev_code;
  currentCodeData.code = updatedCode;
  return{
    type:'SET_CURRENT_CODE',
    payload:currentCodeData
  }
}

export function autoSaveCode(code,lang){
  return (dispatch) => {     

    return axios.post(`/api/code/autosave`,{code,lang}).then(  
      res => dispatch( {type: 'AUTO_SAVE_CODE',payload: false}),
      err => dispatch({ type: 'AUTO_SAVE_CODE', payload: false })
    );
  };
}

export function startAutoSaveLoader(){
  return{
      type:'START_AUTO_SAVE_LOADER',
      payload:true
  }
}

export function executeCode(code,codeString,lang){

    return (dispatch) => {     

        return axios.post('/api/execute/',{code:codeString,language:lang}).then(  
          res => dispatch( {type: 'EXECUTE_CODE',payload: {code:code,codeString:codeString,output:res.data.output}}),
          err => dispatch({ type: 'EXECUTE_CODE', payload: {code:code,codeString:codeString,output:err} })
        );
      };

}

export function toggleLoader(val){
  return{
      type:'TOGGLE_CODE_LOADER',
      payload:val
  }
}

export function setDSInfo(dsStringValue,dsType,prev_code,lang){

  let str = "";
  let datastructures = prev_code.datastructures;
  datastructures[dsType] = dsStringValue;

  Object.values(datastructures).forEach(item=>{
    str += item;
  })

  let currentCodeData = prev_code;
  currentCodeData.dsStringValue = str;
  currentCodeData.datastructures = datastructures;
  return (dispatch) => {     

    return axios.post('/api/code/setDSInfo',{ds:{str,datastructures},lang}).then(  
      res => dispatch( {type: 'SET_DS_INFO',payload: currentCodeData}),
      err => dispatch({ type: 'SET_DS_INFO', payload: currentCodeData })
    );
  };
}

export function getCodeList(lang){
  return (dispatch) => {     

    return axios.get(`/api/code/list?lang=${lang}`).then(  
      res => dispatch( {type: 'GET_CODE_LIST',payload: res.data.data}),
      err => dispatch({ type: 'GET_CODE_LIST', payload: err })
    );
  };
}

export function addNewCode(title,lang){
  return (dispatch) => {     

    return axios.post(`/api/code/newCode`,{title,lang}).then(  
      res => dispatch( {type: 'ADD_NEW_CODE',payload: res.data.newCode}),
      err => dispatch({ type: 'ADD_NEW_CODE', payload: false })
    );
  };
}

export function updateCurrentCode(code_id,lang){
  return (dispatch) => {     

    return axios.post(`/api/code/currentCode`,{code_id,lang}).then(  
      res => dispatch( {type: 'UPDATE_CURRENT_CODE',payload: res.data.currentCode}),
      err => dispatch({ type: 'UPDATE_CURRENT_CODE', payload: {} })
    );
  };
}


export function deleteCode(code_id,codeList,lang){

  let filteredCodeList = codeList.filter(item=>item._id !== code_id);

  return (dispatch) => {     

    return axios.delete(`/api/code/delete?code_id=${code_id}&lang=${lang}`).then(  
      res => dispatch( {type: 'DELETE_CODE',payload: {filteredCodeList,currentCodeData:res.data.currentCode}}),
      err => dispatch({ type: 'DELETE_CODE', payload: codeList })
    );
  };
}
