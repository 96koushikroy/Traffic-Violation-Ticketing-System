import axios from 'axios'
import { SET_CURRENT_USER, GET_ERRORS } from './actionType'
import jwt_decode from 'jwt-decode'
const setAuthToken = token => {
    if (token) {
      // apply to every request
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common['Authorization'];
    }
};
export const loginUser = userData => dispatch => {
    axios.post('/api/login', userData)
    .then(res => {
        const {token} = res.data
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove Token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};