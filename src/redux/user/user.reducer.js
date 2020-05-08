import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

//ES06 state = INITIAL_STATE, gives the argument a default value, if is undefined, not set.
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;