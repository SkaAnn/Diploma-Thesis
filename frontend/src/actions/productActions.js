import axios from 'axios'
import {
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_USER_FAIL, PRODUCT_LIST_USER_REQUEST, PRODUCT_LIST_USER_SUCCESS
}
    from '../constants/productConstants'

// @ Fetching all products
export const listProducts = (sortKey = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products?sortKey=${sortKey}`)

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