import axios from 'axios'
import { SET_CURRENT_USER, GET_ERRORS } from './actionType'
import jwt_decode from 'jwt-decode'
import isEmpty from '../Validation/isEmpty'
import {NotificationManager} from 'react-notifications';

//set jwt token to every header
const setAuthToken = token => {
    if (token) {
      // apply to every request
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common['Authorization'];
    }
};

/* 
    Action Method to login a user which will set the jwt in the localstore
*/
export const loginUser = userData => dispatch => {
    axios.post('/api/login', userData)
    .then(res => {
        const {token} = res.data
        //store the token in browsers localstore
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
/* 
    Action Method to login a user using google which will set the jwt in the localstore
*/
export const googleLoginUser = userData => dispatch => {
    axios.post('/api/oauth/google/login', userData)
    .then(res => {
        if(res.data.requestForCarNumber == true){ //driver not present in the system so, requesting for the car number
            var carnumber = prompt("Please enter your Car number");
            userData.car_number = carnumber
            if(isEmpty(carnumber)){
                NotificationManager.error('Car Number cannot be Empty');
            }
            else{
                //send another request with the car number and create the new driver in the system
                axios.post('/api/oauth/google/signup', userData)
                .then(rrr => {
                    const {token} = rrr.data
                    localStorage.setItem('jwtToken', token)
                    setAuthToken(token)
                    const decoded = jwt_decode(token);
                    dispatch(setCurrentUser(decoded));
                })
            }
            
        }
        else{
            const {token} = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        }
        
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}




// Function to Set logged in user
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