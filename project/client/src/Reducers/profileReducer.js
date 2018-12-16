import {GET_USER_PROFILE, UPDATE_USER_PROFILE} from '../Actions/actionType'

const initState = {
    profile: null
}


const profileReducer = (state = initState, action) => {
    switch(action.type){
        case GET_USER_PROFILE:
            return{
                ...state,
                profile: action.payload
            }
        case UPDATE_USER_PROFILE:
            return{
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export default profileReducer