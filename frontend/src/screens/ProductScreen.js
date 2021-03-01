import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import Tabs from '../components/Tabs'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    console.log(product)

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch])

    return (
        <>
            { loading ? <Loader />
                : error ? <Message>{error}</Message>
                    : (
                        <>
                            <Row>
                                <Col md='6'>
                                    <Row>
                                        <Col size='6'><i className="far fa-star" ></i> Ulož</Col>
                                        <Col size='6' style={{ textAlign: 'right' }}>PONUKA</Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                {/* LAVA CAST OBRAZOVKY */}
                                <Col md='6'>
                                    <Card className='my-3 p-3 rounded'>
                                        <img src='/images/sample.jpg' alt='obrazok produktu ' />
                                    </Card>
                                </Col>

                                {/* PRAVA CAST OBRAZOVKY */}
                                <Col md='6' style={{ marginTop: '1rem' }}>
                                    <p>{product.user.name}</p>
                                    <h2>{product.name}</h2>
                                    <h3>{product.price}</h3>
                                    <p>{product.condition}</p>
                                    <p>Bratislava</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col md='6'>
                                    <Tabs />
                                </Col>
                            </Row>
                        </>
                    )}
        </>
    )
}

export default ProductScreen
