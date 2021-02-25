import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../components/ProductItem'
import SortPanel from '../components/SortPanel'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listProducts } from '../actions/productActions'

const HomeScreen = ({match}) => {
    const sortKey = match.params.sortKey

    const dispatch = useDispatch()  // call and manage an actions

    // Global states
    const productList = useSelector(state => state.productList)     // get global state (from store.js)
    const { loading, error, products } = productList                // parts of global state productList (parts as in reducer)

    // Do something when screen loads

    useEffect(() => {
        // @GET all products from db
        // FIRE OFF the action listProducts action
        dispatch(listProducts(sortKey))
    }, [dispatch, sortKey])

    return (
        <>
            {   loading ? (<Loader />)
                : error ? (<Message>{error}</Message>)
                    :
                    (<>
                        <Route render={({ history }) => <SortPanel history={history} />} />
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <ProductItem key={product._id} product={product} />
                                </Col>))}
                        </Row>
                    </>)
            }
        </>
    )
}

export default HomeScreen
