import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUserProducts } from '../actions/productActions'

const UserProfileScreen = ({ match }) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const productListUser = useSelector(state => state.productListUser)     // get global state (from store.js)
    const { loading: loadingProducts, error: errorProducts, products } = productListUser

    useEffect(() => {
        // DISPATCH USER DETAILS
        dispatch(listUserDetails(match.params.id))
        // DISPATCH USER PRODUCTS
        dispatch(listUserProducts(match.params.id))
    }, [dispatch])

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (
                            <>
                                <p>{user._id}</p>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </>)}
            </Col>
            <Col md={9}>
                {loadingProducts ? <Loader />
                    : errorProducts ? <Message>{error}</Message>
                        : (
                             products.map(product => (
                                 <p>{product.name}</p>
                             )) 
                        )}
            </Col>
        </Row>
    )
}

export default UserProfileScreen
