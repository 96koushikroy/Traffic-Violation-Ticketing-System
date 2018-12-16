import axios from 'axios'
import {GET_USER_PROFILE, UPDATE_USER_PROFILE, GET_ERRORS, SET_CURRENT_USER_NAME} from './actionType'
import {NotificationManager} from 'react-notifications';


//get admin profile from admin model on the server
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

//get police profile from police model on the server
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

//get driver profile from driver model on the server
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

//update driver profile
export const updateDriverProfile = (Data) => dispatch => {
    axios
    .post('/api/driver/editprofile', Data)
    .then(res => {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: Data
        })
        dispatch({
            type: SET_CURRENT_USER_NAME,
            payload: Data.name
        })
        NotificationManager.success('Profile Updated Successfully')
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}
//update admin profile
export const updateAdminProfile = (Data) => dispatch => {
    axios
    .post('/api/admin/editprofile', Data)
    .then(res => {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: Data
        })
        dispatch({
            type: SET_CURRENT_USER_NAME,
            payload: Data.name
        })
        NotificationManager.success('Profile Updated Successfully')
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}
//update police profile
export const updatePoliceProfile = (Data) => dispatch => {
    axios
    .post('/api/police/editprofile', Data)
    .then(res => {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: Data
        })
        dispatch({
            type: SET_CURRENT_USER_NAME,
            payload: Data.name
        })
        NotificationManager.success('Profile Updated Successfully')
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}