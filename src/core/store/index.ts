import { createLogicMiddleware } from 'redux-logic';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
//
import logics from "../containers/LogicContainer";
import reducers from "../containers/ReducerContainer";
// @ts-ignore-next-line
const storeEnhancers: any = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default createStore(
    combineReducers(reducers.all()),
    storeEnhancers(
        applyMiddleware(
            createLogicMiddleware(logics.all())
        )
    )
);