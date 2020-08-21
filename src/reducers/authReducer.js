import {SET_CURRENT_USER} from '../actions/authActions';

export default (state, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !Object.is(action.payload, {}),
                user: action.payload
            };
        default:
            throw new Error();
    }
};