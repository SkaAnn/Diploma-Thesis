import React, { useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../components/ProductItem'
import SortPanel from '../components/SortPanel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ControlPanel from '../components/ControlPanel'

import { listProducts } from '../actions/productActions'
import ProductCard from '../components/ProductCard'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    //console.log('keyword', keyword)
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
        dispatch(listProducts(sortKey, keyword, pageNumber))
    }, [dispatch, sortKey, keyword, pageNumber])

    return (
        <>

            <Route render={({ history }) => <ControlPanel history={history} keyword={keyword ? keyword : ''} />} />

            <Container className='mt-3'>
                {/* <Route render={({ history }) => <SortPanel history={history} keyword={keyword ? keyword : ''} />} /> */}
                {!keyword ?
                    <h2>Všetky produkty</h2>
                    : <>
                        <Link to='/' className='btn btn-light'>Go Back</Link>
                        <h2>Výsledky hľadania slova "<strong>{keyword}</strong>"</h2>
                    </>}
                {loading ? (<Loader />)
                    : error ? (<Message>{error}</Message>)
                        :
                        (
                            <>
                                {products.length === 0 && <div style={{ maxWidth: '40rem' }}><Message>Nenašli sa žiadne produkty</Message></div>}
                                <Row>
                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            {/* <ProductItem key={product._id} product={product} /> */}
                                            <ProductCard key={product._id} product={product} />
                                        </Col>))}
                                </Row>
                                <Paginate pages={pages} page={page} sortKey={sortKey ? sortKey : ''} keyword={keyword ? keyword : ''} />


                            </>
                        )}
            </Container>
        </>)
}

export default HomeScreen
