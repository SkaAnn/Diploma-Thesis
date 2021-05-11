import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import SecondHeader from '../components/SecondHeader'
import MyPagination from '../components/MyPagination'
import ProductCard from '../components/ProductCard'

import { listProducts } from '../actions/productActions'


const HomeScreen = ({ match, history }) => {
    const pageSize = 8
    const keyword = match.params.keyword
    const sortKey = match.params.sortKey
    const filter = match.params.filter

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()  // call and manage an actions

    // Global states
    const productList = useSelector(state => state.productList)     // get global state (from store.js)
    const { loading, error, products, count, pages, page } = productList                // parts of global state productList (parts as in reducer)

    // Do something when screen loads

    useEffect(() => {
        // @GET all products from db
        // FIRE OFF the action listProducts action
        console.log('history ', history.location.pathname)
        dispatch(listProducts(sortKey, keyword, filter, pageNumber, pageSize))
    }, [dispatch, history, sortKey, keyword, filter, pageNumber])

    return (
        <>
            
            <Route render={({ history, match }) => <SecondHeader history={history} match={match} keyword={keyword ? keyword : ''} />} />

            <Container className='mt-3'>
                {/* <Route render={({ history }) => <SortPanel history={history} keyword={keyword ? keyword : ''} />} /> */}
                {!keyword ?
                    <h2 className='mb-3 pt-3 fw-600'>Všetky produkty</h2>
                    : <>
                        <LinkContainer to='/' >
                            <h6 className='pt-3 fw-600 curs-pointer'><i className="fas fa-arrow-left"></i> Späť</h6>
                        </LinkContainer>
                        <h2 className='mb-3 pt-3 fw-400'>Výsledky hľadania slova "<strong>{keyword}</strong>"</h2>
                    </>}
                {loading ? (<Loader />)
                    : error ? (<Message>{error}</Message>)
                        :
                        (
                            <>
                                {products.length === 0 && <div><Message>Nenašli sa žiadne produkty</Message></div>}
                                <Row>
                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <ProductCard key={product._id} product={product} />
                                        </Col>))}
                                </Row>
                                {pages > 1 &&
                                    <Route render={({ history }) =>
                                        <MyPagination itemsCountPerPage={pageSize} totalItemsCount={count} activePage={page}
                                            history={history} screen={0} sortKey={sortKey ? sortKey : ''} keyword={keyword ? keyword : ''} filter={filter ? filter : ''} />
                                    }
                                    />}

                            </>
                        )}
            </Container>
        </>)
}

export default HomeScreen
