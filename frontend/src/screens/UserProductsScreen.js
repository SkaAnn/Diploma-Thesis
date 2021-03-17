import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listUserDetails } from '../actions/userActions'
import ProductItem from '../components/ProductItem'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUserProducts } from '../actions/productActions'
import UserInfoPanel from '../components/UserInfoPanel'

const UserProductsScreen = ({ match }) => {

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
            <Col lg={3}>


                {loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : user && (
                            <>
                                <h4 className='fw-400 text-center lh-15'><span className='text-uppercase'>Profil užívateľa </span>
                                    {/* <br /> <span className='fw-600'> {user.name} </span> */}
                                </h4>
                                <div style={{ border: '0', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                                    <UserInfoPanel user={user} />
                                </div>
                            </>
                            // <>
                            //     <p>{user._id}</p>
                            //     <p>{user.name}</p>
                            //     <p>{user.email}</p>
                            // </>

                        )}
            </Col>
            <Col lg={9}>
                {loadingProducts ? <Loader />
                    : errorProducts ? <Message>{error}</Message>
                        : (
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} lg={4} md={6}>
                                        <ProductItem key={product._id} product={product} />
                                    </Col>))}
                            </Row>
                        )}
            </Col>
        </Row>
    )
}

export default UserProductsScreen
