import { Types } from "./actionTypes";
const initialState = {
    users: [],
    stories: [],
    loggedInUser: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                loggedInUser: action.payload
            }
        case Types.LOGOUT:
            return {
                ...state,
                loggedInUser: null
            }
        case Types.FETCH_STORIES:
            return {
                ...state,
                stories: action.payload
            }
        case Types.FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case Types.UPDATE_STORIES:
            return {
                ...state,
                stories: action.payload
            }
        default:
            return state;
    }
}

export default reducer