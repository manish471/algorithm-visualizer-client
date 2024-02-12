import {combineReducers} from 'redux';
import layout_reducer from './layout_reducer';
import code_reducer from './code_reducer';
import user_reducer from './user_reducer';
import visualizer_reducer from './visualizer_reducer';

const rootReducer = combineReducers({
    layout_reducer,code_reducer,user_reducer,visualizer_reducer
})

export default rootReducer;