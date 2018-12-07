import axios from 'axios'
import {GET_USER_PROFILE, GET_ERRORS} from './actionType'
import {NotificationManager} from 'react-notifications';


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