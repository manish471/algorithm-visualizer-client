const initialState={
    start:false,
    step:0,
    speed:1000,
    metaData:null,
    timelineData:[],
    stackData:[],
    inMatrix:{},
    scrollTopOffset:0
}

export default function(state=initialState,action){
    switch (action.type) {
        case 'START_VISUALIZATION':
            return{...state,start:action.payload}
        case 'STOP_VISUALIZATION':
            return{...state,start:action.payload}
        case 'SET_STEP_VALUE':
            return{...state,step:action.payload}
        case 'SET_SCROLL_TOP_OFFSET_VALUE':
            return{...state,scrollTopOffset:action.payload}
        case 'SET_SPEED_VALUE':
            return{...state,speed:action.payload}
        case 'GET_VISUALIZER_METADATA':
            return{...state,metaData:action.payload}
        case 'GET_TIMELINE_DATA':
            return{...state,timelineData:action.payload.timelineData,inMatrix:action.payload.inMatrix,stackData:action.payload.stackData}
        default:
            return state;
    }
}