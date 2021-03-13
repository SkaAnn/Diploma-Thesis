import {
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_MY_FAIL, PRODUCT_LIST_MY_REQUEST, PRODUCT_LIST_MY_RESET, PRODUCT_LIST_MY_SUCCESS,
    PRODUCT_LIST_USER_FAIL, PRODUCT_LIST_USER_REQUEST, PRODUCT_LIST_USER_SUCCESS,
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET,
    PRODUCT_ADD_FOLLOWER_REQUEST, PRODUCT_ADD_FOLLOWER_SUCCESS, PRODUCT_ADD_FOLLOWER_FAIL,
    PRODUCT_REMOVE_FOLLOWER_REQUEST, PRODUCT_REMOVE_FOLLOWER_SUCCESS, PRODUCT_REMOVE_FOLLOWER_FAIL, PRODUCT_LIST_FAVORITE_REQUEST, PRODUCT_LIST_FAVORITE_SUCCESS, PRODUCT_LIST_FAVORITE_FAIL
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
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            } // data in payload

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
        case PRODUCT_DETAILS_RESET:
            return { product: {} }
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

// Fetch MY products
export const productListMyReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_MY_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_MY_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_MY_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_LIST_MY_RESET:
            return { products: [] }
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

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const productAddFollowerReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADD_FOLLOWER_REQUEST:
            return { loading: true }
        case PRODUCT_ADD_FOLLOWER_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_ADD_FOLLOWER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productRemoveFollowerReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REMOVE_FOLLOWER_REQUEST:
            return { loading: true }
        case PRODUCT_REMOVE_FOLLOWER_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_REMOVE_FOLLOWER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Fetch favorite products from user
export const productListFavoriteReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_FAVORITE_REQUEST: 
            return { loading: true, products: [] }   
        case PRODUCT_LIST_FAVORITE_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAVORITE_FAIL:
            return { loading: false, error: action.payload }   
        default:
            return state
    }
}