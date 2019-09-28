import { createLogicMiddleware } from 'redux-logic';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
//
import LogicContainer from "../containers/LogicContainer";
import ReducerContainer from "../containers/ReducerContainer";
//
const logics = LogicContainer.new.getLogics();
const reducers = ReducerContainer.new.getReducers();
// @ts-ignore-next-line
const storeEnhancers: any = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const logicMiddleware = createLogicMiddleware(logics);
console.log(reducers)
export default () => createStore(
    combineReducers(reducers),
    storeEnhancers(
        applyMiddleware(
            logicMiddleware
        )
    )
);