import { createLogicMiddleware } from 'redux-logic';
import { createStore, applyMiddleware, compose } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//
import rootReducers from '../reducers';
import rootLogics from '../logics';

// @ts-ignore-next-line
const storeEnhancers: any = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const logicMiddleware = createLogicMiddleware(rootLogics);

export default function configureStore() {
    return createStore(
        rootReducers,
        storeEnhancers(
            applyMiddleware(
                logicMiddleware,
                // reduxImmutableStateInvariant
            )
        )
    );
};