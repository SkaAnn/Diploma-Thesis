import axios from 'axios'
import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_RESET, USER_PROFILE_SUCCESS,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants'

// @ Login user 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login',
            { email, password },
            config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // Set user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Logout user
export const logout = () => (dispatch) => {
    // Remove user from local storage
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_PROFILE_RESET })
}

// @ Register user
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users',
            { name, email, password },
            config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        // Also login user after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // Set user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ List user with id details
export const listUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/users/${id}`)

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Fetch my user profile
export const getUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/profile`, config)

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Update my user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        // Change user name in navbar
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}