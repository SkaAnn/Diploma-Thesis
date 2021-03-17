import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../components/ProductItem'
import SortPanel from '../components/SortPanel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import { listProducts } from '../actions/productActions'
import ProductCard from '../components/ProductCard'

const HomeScreen = ({ match }) => {
    const sortKey = match.params.sortKey

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()  // call and manage an actions

    // Global states
    const productList = useSelector(state => state.productList)     // get global state (from store.js)
    const { loading, error, products, pages, page } = productList                // parts of global state productList (parts as in reducer)

    // Do something when screen loads

    useEffect(() => {
        // @GET all products from db
        // FIRE OFF the action listProducts action
        dispatch(listProducts(sortKey, pageNumber))
    }, [dispatch, sortKey, pageNumber])

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
                                    {/* <ProductItem key={product._id} product={product} /> */}
                                    <ProductCard key={product._id} product={product} /> 
                                </Col>))}
                        </Row>
                        <Paginate pages={pages} page={page} sortKey={sortKey ? sortKey : ''} />
                    </>)
            }
        </>
    )
}

export default HomeScreen
