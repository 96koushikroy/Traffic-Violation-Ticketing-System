import axios from 'axios'
import {GET_USER_PROFILE, UPDATE_USER_PROFILE, GET_ERRORS} from './actionType'
import {BASE_URL} from '../config'

//get police profile from police model on the server
export const getPoliceProfile = () => dispatch => {
    axios
    .get(BASE_URL + '/api/police/viewprofile')
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
        //NotificationManager.error(err.response.data.title);
    })
}

//update police profile
export const updatePoliceProfile = (Data) => dispatch => {
    axios
    .post(BASE_URL + '/api/police/editprofile', Data)
    .then(res => {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        //NotificationManager.error(err.response.data.title);
    })
}