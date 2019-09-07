export const makeAction: Function = (type: string) => (payload: object = {}) => ({type, payload});
//
export const makeReducer: Function = (initialState: object = {}, reducers: object = {}) => {
    return (state: object = initialState, action: object) => {
        const type = action.type || '';
        if (reducers.hasOwnProperty(type)) {
            return reducers[type](state, action)
        }
        return state;
    }
};
//
export default {
    makeAction,
    makeReducer,
};