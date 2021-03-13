// Redux store file
// to store all reducers and middleware
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productListReducer, productDetailsReducer, productListUserReducer,
    productCreateReducer, productUpdateReducer, productListMyReducer,
    productDeleteReducer, productAddFollowerReducer, productRemoveFollowerReducer,
    productListFavoriteReducer
} from './reducers/productReducers'
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userProfileReducer, userUpdateProfileReducer
} from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productListUser: productListUserReducer,
    productListMy: productListMyReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productAddFollower: productAddFollowerReducer,
    productRemoveFollower: productRemoveFollowerReducer,
    productListFavorite: productListFavoriteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

// Get from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store