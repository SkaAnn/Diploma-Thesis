import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import ProductItem from '../components/ProductItem'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    // Do something when screen loads
    useEffect(() => {
        // GET products from database 
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()

    }, [])

    return (
        <>
            <h1>Homescreen DP-2021</h1>
            {console.log(JSON.stringify(products))}
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductItem key={product._id} product={product} />
                    </Col>))}
            </Row>
        </>
    )
}

export default HomeScreen