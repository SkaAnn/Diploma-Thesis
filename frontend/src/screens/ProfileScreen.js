import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Form, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyProducts, deleteProduct } from '../actions/productActions'
import { getUserProfile, listUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'

const UserProfileScreen = ({ history }) => {
    // Component level state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

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
    const productListMy = useSelector(state => state.productListMy)
    const { loading: loadingProducts, error: errorProducts, products } = productListMy

    // updated product from EditProductScreen
    const productUpdate = useSelector((state) => state.productUpdate)
    const { success: productUpdateSuccess } = productUpdate

    // deleted product
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || productUpdateSuccess || successDelete) {
                dispatch({ type: PRODUCT_UPDATE_RESET })
                dispatch({ type: PRODUCT_DELETE_RESET })
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                // DISPATCH USER DETAILS
                dispatch(getUserProfile())
                // DISPATCH USER PRODUCTS
                dispatch(listMyProducts())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success, productUpdateSuccess, successDelete, history])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]  // can upload multiple files
        console.log(file)
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        formData.append('avatar', file)    // image sa vola i v backend
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log(formData)

            const { data } = await axios.post(`/api/upload/profile`, formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Táto operácia je nezvratná. Naozaj chcete odstrániť produkt?')) {
            // DELETE PRODUCTS
            dispatch(deleteProduct(id))
        }
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

                                <Link to={'/user/my/profile/update'}> Update Profil </Link>

                                    <Form.Group controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type='text' placeholder='Enter image url' value={image}
                                            onChange={(e) => setImage(e.target.value)} ></Form.Control>
                                        <Form.File id='image-file' label='Choose File' custom
                                            onChange={uploadFileHandler}></Form.File>
                                        {uploading && <Loader />}
                                    </Form.Group>

                                    <Form.Group controlId='profile-img' className='text-center'>
                                        <Image src="/images/sample-profile.svg" roundedCircle fluid
                                            style={{ maxHeight: '150px' }} className='mx-auto' />
                                    </Form.Group>

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
                                    <th>Názov</th>
                                    <th>Kategória</th>
                                    <th>Cena</th>
                                    <th>Dátum pridania</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.createdAt.substring(0, 10)}</td>
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
