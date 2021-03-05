import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ProductItem from '../components/ProductItem'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUserProducts } from '../actions/productActions'
import { getUserProfile, listUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const UserProfileScreen = ({ history }) => {
    // Component level state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    // is logged
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // get info about logged user
    const userProfile = useSelector(state => state.userProfile)
    const { loading, error, user } = userProfile

    // update logged user
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    // get products from logged user
    const productListUser = useSelector(state => state.productListUser)
    const { loading: loadingProducts, error: errorProducts, products } = productListUser

    // updated product from EditProductScreen
    const productUpdate = useSelector((state) => state.productUpdate)
    const { success: productUpdateSuccess } = productUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || productUpdateSuccess) {
                dispatch({ type: PRODUCT_UPDATE_RESET })
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                // DISPATCH USER DETAILS
                dispatch(getUserProfile())
                // DISPATCH USER PRODUCTS
                dispatch(listUserProducts(userInfo._id))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success, productUpdateSuccess, history])

    const deleteHandler = (id) => {
        console.log('Delete...')
        // if(window.confirm('Are you sure')){
        // dispatch(deleteUser(id))
        // }
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const updatedUser = { id: user._id, name, email, password }
        console.log(updatedUser)
        // DISPATCH UPDATE PROFILE
        dispatch(updateUserProfile(updatedUser))

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

                                    {/* <Form.Group controlId='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' placeholder='Enter password' value={password}
                                            onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='confirmPassword'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type='password' placeholder='Confirn password' value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                                    </Form.Group> */}
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
