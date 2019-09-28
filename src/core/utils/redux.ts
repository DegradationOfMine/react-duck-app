import Action from "../types/Action";
import Reducers from "../types/Reducers";
import State from "../types/State";

export const makeAction = (type: string) => (payload: object = {}) => ({type, payload});
//
export const makeReducer = (initialState: State = {}, reducers: Reducers = {}) => {
    return (state: State = initialState, action: Action) => {
        const type = action.type || '';
        if (reducers.hasOwnProperty(type)) {
            return reducers[type](state, action)
        }
        return state;
    }
};