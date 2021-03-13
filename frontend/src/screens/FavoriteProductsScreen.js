import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFavoriteProducts } from '../actions/productActions'

const FavoriteProductsScreen = () => {
    const dispatch = useDispatch()

    const productListFavorite = useSelector(state => state.productListFavorite)
    const { loading, error, products } = productListFavorite

    useEffect(() => {
        // @GET all products from db
        // FIRE OFF the action listProducts action
        dispatch(listFavoriteProducts())
    }, [dispatch])

    return (
        <Row>
            <Col>
                <h2>My favorite products ({products.length})</h2>
                {loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (<Table striped bordered responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Názov</th>
                                    <th>Kategória</th>
                                    <th>Cena</th>
                                    <th>Dátum pridania</th>
                                    <th>Vlastník</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.createdAt.substring(0, 10)}</td>
                                        <td><Link to={`/products/user/${product.user._id}`}>{product.user.name}</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}
            </Col>
        </Row>
    )
}

export default FavoriteProductsScreen
