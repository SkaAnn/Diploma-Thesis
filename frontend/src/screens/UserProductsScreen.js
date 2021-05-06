import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import UserInfoPanel from '../components/UserInfoPanel'
import ProductCard from '../components/ProductCard'
import MyPagination from '../components/MyPagination'

import { listUserProducts } from '../actions/productActions'
import { listUserDetails } from '../actions/userActions'

const UserProductsScreen = ({ match }) => {
    const pageSize = 6 // TODO 10
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const productListUser = useSelector(state => state.productListUser)     // get global state (from store.js)
    const { loading: loadingProducts, error: errorProducts, products, count, pages, page } = productListUser

    useEffect(() => {
        // DISPATCH USER DETAILS
        dispatch(listUserDetails(match.params.id))
        // DISPATCH USER PRODUCTS
        dispatch(listUserProducts(match.params.id, pageNumber, pageSize))
    }, [dispatch, match.params.id, pageNumber])

    return (
        <Container className='mt-5rem'>
            <Row>
                <Col lg={3}>
                    {loading ? <Loader />
                        : error ? <div style={{ marginTop: '2.5rem' }}><Message>{error}</Message></div>
                            : user && (
                                <div className='mb-3 pt-4'>
                                    <h5 className='text-center lh-15'><span className='fw-600'>Profil</span> <span className='fw-400'><i>{user.name}</i></span></h5>
                                    <div style={{ border: '0', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                                        <UserInfoPanel user={user} />
                                    </div>
                                </div>
                            )}
                </Col>
                <Col lg={9}>
                    {loadingProducts ? <Loader />
                        : errorProducts ? <div style={{ marginTop: '2.5rem' }}><Message>{errorProducts}</Message></div>
                            : (
                                <>
                                    <h2 className='mb-3 pt-4 fw-600'>Produkty</h2>
                                    {/* <h2 className='text-uppercase fw-400 mb-2'>Produkty</h2> */}
                                    <Row>
                                        {products.map(product => (
                                            <Col key={product._id} xl={4} lg={5} md={6}>
                                                <ProductCard key={product._id} product={product} />
                                            </Col>))}
                                    </Row>

                                    {pages > 1 &&
                                        <Route render={({ history }) =>
                                            <MyPagination itemsCountPerPage={pageSize} totalItemsCount={count} activePage={page} history={history} screen={3} id={match.params.id} />
                                        } />
                                    }

                                </>
                            )}
                </Col>
            </Row>
        </Container>
    )
}

export default UserProductsScreen
