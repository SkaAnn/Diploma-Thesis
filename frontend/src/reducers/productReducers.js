import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'

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