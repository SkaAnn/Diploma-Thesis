import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listUserDetails } from '../actions/userActions'
import ProductItem from '../components/ProductItem'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUserProducts } from '../actions/productActions'

const UserProfileScreen = ({ history }) => {
    // Component level state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const productListUser = useSelector(state => state.productListUser)     // get global state (from store.js)
    const { loading: loadingProducts, error: errorProducts, products } = productListUser

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            // DISPATCH USER DETAILS
            dispatch(listUserDetails(userInfo._id))
            // DISPATCH USER PRODUCTS
            dispatch(listUserProducts(userInfo._id))
        }
    }, [dispatch, userInfo, history])

    const deleteHandler = (id) => {
        console.log('Delete...')
        // if(window.confirm('Are you sure')){
        // dispatch(deleteUser(id))
        // }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Row>
            <Col lg={3}>
                <h2>User Profile</h2>

                {loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (
                            <>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='name' placeholder='Enter name' value={name}
                                            onChange={(e) => setName(e.target.value)} ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='email'>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type='email' placeholder='Enter email' value={email}
                                            onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' placeholder='Enter password' value={password}
                                            onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='confirmPassword'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type='password' placeholder='Confirn password' value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Update</Button>
                                </Form>
                            </>)}
            </Col>
            <Col lg={9}>
                {loadingProducts ? <Loader />
                    : errorProducts ? <Message>{error}</Message>
                        : (<Table striped bordered responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    {/* <th>EMAIL</th> */}
                                    {/* <th>ADMIN</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        {/* <td><a href={`mailto:${user.email}`}>{user.email}</a></td> */}
                                        {/* <td>{user.isAdmin ?
                                            (<i className='fas fa-check' style={{ color: 'green' }} />)
                                            : (<i className='fas fa-times' style={{ color: 'red' }} />)}</td> */}
                                        <td>
                                            <LinkContainer to={`/user/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}
            </Col>
        </Row>
    )
}

export default UserProfileScreen
