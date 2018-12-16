import axios from 'axios'
import {GET_USER_PROFILE, UPDATE_USER_PROFILE, GET_ERRORS, SET_CURRENT_USER_NAME} from './actionType'
import {BASE_URL} from '../config'
import { showMessage } from "react-native-flash-message";

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
        showMessage({
            message: err.response.data.title,
            type: "danger",
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

        dispatch({
            type: SET_CURRENT_USER_NAME,
            payload: Data.name
        })

        showMessage({
            message: "Profile updated successfully.",
            type: "success",
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        showMessage({
            message: err.response.data.title,
            type: "danger",
        })
    })
}