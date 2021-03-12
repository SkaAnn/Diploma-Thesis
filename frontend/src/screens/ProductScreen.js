import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import { MDBBadge } from 'mdbreact'
import Tabs from '../components/Tabs'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import ImageCarousel from '../components/ImageCarousel'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

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
                                    PONUKA / Elektronika / Bezdrotove sluchadla
                                </Col>
                            </Row>

                            <Row>
                                {/* LAVA CAST OBRAZOVKY */}
                                <Col md='6' className='mb-2'>
                                    <ImageCarousel images={product.images} />
                                </Col>

                                {/* PRAVA CAST OBRAZOVKY */}
                                <Col md='6' >
                                    <div className='border px-4'>
                                        <p> <i className="fas fa-user"></i> {product.user.name}  <i className="fas fa-clock"></i> 22/01/2020 </p>
                                        <h2>{product.name}  <i className="far fa-star" ></i></h2>
                                        <h3>{product.price} € <MDBBadge className='ml-3' color="primary">{product.condition}</MDBBadge></h3>
                                        <p>dostupne: 1 ks</p>
                                        <p> <i className="fas fa-map-marker-alt"></i> Bratislava</p>
                                    </div>

                                    <Tabs />

                                </Col>
                            </Row>

                        </>
                    )
            }
        </>
    )
}

export default ProductScreen
