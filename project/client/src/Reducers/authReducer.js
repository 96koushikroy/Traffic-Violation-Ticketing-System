import {SET_CURRENT_USER, SET_CURRENT_USER_NAME} from '../Actions/actionType'
import isEmpty from '../Validation/isEmpty'

const initialState = {
    isAuthenticated: false,
    user: {}
};


export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case SET_CURRENT_USER_NAME:
        let uu = JSON.parse(JSON.stringify(state.user));
        uu.name = action.payload
        return {
          ...state,
          user: uu
        };
      default:
        return state;
    }
}