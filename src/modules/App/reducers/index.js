import { combineReducers } from "redux";
//
import {makeReducer} from '../../../core/utils/redux'
//
export default combineReducers({
    app: makeReducer()
});