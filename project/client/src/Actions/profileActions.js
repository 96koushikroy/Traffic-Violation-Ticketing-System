import axios from 'axios'
import {GET_USER_PROFILE, GET_ERRORS} from './actionType'
import {NotificationManager} from 'react-notifications';


//get admin profile form admin model on the server
export const getAdminProfile = () => dispatch => {
    axios
    .get('/api/admin/viewprofile')
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}

//get police profile form police model on the server
export const getPoliceProfile = () => dispatch => {
    axios
    .get('/api/police/viewprofile')
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}

//get driver profile form driver model on the server
export const getDriverProfile = () => dispatch => {
    axios
    .get('/api/driver/viewprofile')
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}