import axios from 'axios'
import {
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_MY_FAIL, PRODUCT_LIST_MY_REQUEST, PRODUCT_LIST_MY_SUCCESS,
    PRODUCT_LIST_USER_FAIL, PRODUCT_LIST_USER_REQUEST, PRODUCT_LIST_USER_SUCCESS,
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL
}
    from '../constants/productConstants'

// @ Fetching all products
export const listProducts = (sortKey = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        console.log(`GET /api/products?sortKey=${sortKey}&pageNumber=${pageNumber}`)
        const { data } = await axios.get(`/api/products?sortKey=${sortKey}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ List product details
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Fetching products by user
export const listUserProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_USER_REQUEST })

        const { data } = await axios.get(`/api/products/user/${id}`)

        dispatch({ type: PRODUCT_LIST_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Fetching MY products
export const listMyProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_MY_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/products/my', config)

        dispatch({
            type: PRODUCT_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_MY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Create new product
export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        // Get userInfo from userLogin
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(config)
        console.log(JSON.stringify(product))

        const { data } = await axios.post(`/api/products`, product, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Update existing product
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

// @ Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })


        // destructing, miesto bodkovej notacie
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}