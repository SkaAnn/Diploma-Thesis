import {
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_USER_FAIL, PRODUCT_LIST_USER_REQUEST, PRODUCT_LIST_USER_SUCCESS
} from '../constants/productConstants'

// Fetch all products
export const productListReducer = (state = { products: [] }, action) => {
    // evaluate object action type
    switch (action.type) {
        // product list request
        case PRODUCT_LIST_REQUEST:  // action
            return { loading: true, products: [] }    // currently fetching - making request

        // product list success - get the data, success res
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload } // data in payload

        // product list fail - error
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }    // error in payload
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { user: {} } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Fetch products by user
export const productListUserReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_USER_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_USER_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}