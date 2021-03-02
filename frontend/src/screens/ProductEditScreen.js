import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    // Component level state    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [classification, setClassification] = useState('')
    const [condition, setCondition] = useState('')
    const [propsList, setPropsList] = useState([])  // moreProperties

    const dispatch = useDispatch()

    // Global states
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (successUpdate) {
                dispatch({ type: PRODUCT_UPDATE_RESET })
                dispatch({ type: PRODUCT_DETAILS_RESET })
                history.push('/user/my/profile')
            } else {

                if (!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    // Pre-set formular with actual data
                    setName(product.name)
                    setPrice(product.price)
                    // setImage(product.image)
                    // setBrand(product.brand)
                    // setCategory(product.category)
                    // setCountInStock(product.countInStock)
                    setDescription(product.description)
                    setClassification(product.classification)
                    setCondition(product.condition)
                    setPropsList(product.moreProperties)
                }
            }
        }
    }, [dispatch, productId, product, history, successUpdate])

    // Handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...propsList];
        list[index][name] = value;
        setPropsList(list);
    };

    // Handle click event of the Remove button
    const handleRemoveClick = index => {
        console.log(`remove ${index}`)
        const list = [...propsList];
        console.log(`list before ${JSON.stringify(list)}`)
        list.splice(index, 1);
        console.log(`list after ${JSON.stringify(list)}`)
        setPropsList(list);
    };

    // Handle click event of the Add button
    const handleAddClick = () => {
        setPropsList([...propsList, { key: '', val: '' }]);
    };

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH UPDATE PRODUCT
        const newProduct = {
            _id: productId, name, description, price,
            classification, condition, moreProperties: propsList
        }

        dispatch(updateProduct(newProduct))
    }

    return (
        <>
            <Link to='/user/my/profile' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter name' value={name}
                                        onChange={(e) => setName(e.target.value)} ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Popis</Form.Label>
                                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                        placeholder='Zadajte popis produktu' rows={4} />
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number' placeholder='Enter price' value={price}
                                        onChange={(e) => setPrice(e.target.value)} ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId="moreProperties">
                                    <Form.Label>Pridaj ďalšie vlastnosti</Form.Label>
                                </Form.Group>
                                {propsList.length === 0
                                    ? <Button type='button' className='btn btn-primary' onClick={handleAddClick}>Pridať</Button>
                                    :
                                    propsList.map((x, i) => {
                                        return (
                                            <Form.Group key={i}>
                                                <Form.Control
                                                    type='text'
                                                    name='key'
                                                    placeholder='Zadajte názov vlastnosti'
                                                    value={x.key}
                                                    onChange={e => handleInputChange(e, i)}
                                                />

                                                <Form.Control
                                                    type='text'
                                                    className="ml10"
                                                    name='val'
                                                    placeholder='Zadajte hodnotu vlastnosti'
                                                    value={x.val}
                                                    onChange={e => handleInputChange(e, i)}
                                                />

                                                <div className="btn-box">
                                                    {propsList.length >= 1 &&
                                                        <Button type='button' className="mr10" onClick={() => handleRemoveClick(i)}>
                                                            <i className="fas fa-trash" /> Odstrániť</Button>
                                                    }
                                                    {propsList.length - 1 === i &&
                                                        <Button type='button' onClick={handleAddClick} className="btn btn-outline-primary">
                                                            <i className="fas fa-plus-circle" /> Pridať</Button>}
                                                </div>
                                            </Form.Group>
                                        );
                                    })}

                                <Button type='submit' variant='primary'>Aktualizovať</Button>

                            </Form>)}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
