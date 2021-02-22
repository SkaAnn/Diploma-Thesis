import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    // Do something when screen loads
    useEffect(() => {
        console.log('hello')

        const fetchProducts = async () =>{
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()

    }, [])

    return (
        <div>
            <h1>Homescreen DP-2021</h1>
            {console.log(JSON.stringify(products))}
            {products.map(product => (<p>{JSON.stringify(product)}</p>))}
        </div>
    )
}

export default HomeScreen
