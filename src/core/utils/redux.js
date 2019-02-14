export const makeAction = type => (payload = {}) => ({type, payload})
//
export const makeReducer = (initialState = {}, reducers = {}) => {
    return (state = initialState, action) => {
        const type = action.type || '';
        if (reducers.hasOwnProperty(type)) {
            return reducers[type](state, action)
        }
        return state;
    }
}
//
export default {
    makeAction,
    makeReducer,
};