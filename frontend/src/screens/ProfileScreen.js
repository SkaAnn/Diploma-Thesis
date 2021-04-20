import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Route } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyProducts, deleteProduct } from '../actions/productActions'
import { getUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'
import UserInfoPanel from '../components/UserInfoPanel'
import { translateClassification, transformDate  } from '../utils/translate'
import MyPagination from '../components/MyPagination'

const UserProfileScreen = ({ history, match, prevProps }) => {
    const pageSize = 5  // TODO 10
    const pageNumber = match.params.pageNumber || 1
    // ked nastavim useState na 1, tak sa nebude nacitavat pri Moj profil(lenze to i zosatne na poslednej prezeranej strane...)
    const [newPageNumber, setNewPageNumber] = useState(0)   // TODO: rename oldPage

    const dispatch = useDispatch()

    // Global level state
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
    const { loading: loadingProducts, error: errorProducts, products, count, pages, page } = productListMy

    // create product from CreateProductScreen
    const productCreate = useSelector((state) => state.productCreate)
    const { success: productCreateSuccess } = productCreate

    // updated product from EditProductScreen
    const productUpdate = useSelector((state) => state.productUpdate)
    const { success: productUpdateSuccess } = productUpdate

    // deleted product
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const componentDidUpdate = (prevProps) => {
        console.log("zmenil sa ", pageNumber, newPageNumber)
        if (newPageNumber !== pageNumber) {//match.params.pageNumber) {
            setNewPageNumber(pageNumber)//match.params.pageNumber);
            dispatch(listMyProducts(pageNumber, pageSize))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name) {
                // DISPATCH USER DETAILS
                dispatch(getUserProfile())
                // DISPATCH MY PRODUCTS
                dispatch(listMyProducts(pageNumber, pageSize))
                setNewPageNumber(pageNumber)
            }

            if (success) {   // success profile update
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                // DISPATCH USER DETAILS
                dispatch(getUserProfile())
            }

            if (productCreateSuccess || productUpdateSuccess || successDelete) {
                dispatch({ type: PRODUCT_CREATE_RESET })
                dispatch({ type: PRODUCT_UPDATE_RESET })
                dispatch({ type: PRODUCT_DELETE_RESET })
                // DISPATCH MY PRODUCTS
                dispatch(listMyProducts(pageNumber, pageSize))
            }

            componentDidUpdate(prevProps)

            // if (pageNumber){
            //     console.log("som v pagenumber")
            // }

            // if (!user || !user.name || success || productCreateSuccess || productUpdateSuccess || successDelete) {
            //     dispatch({ type: PRODUCT_CREATE_RESET })
            //     dispatch({ type: PRODUCT_UPDATE_RESET })
            //     dispatch({ type: PRODUCT_DELETE_RESET })
            //     dispatch({ type: USER_UPDATE_PROFILE_RESET })
            //     // DISPATCH USER DETAILS
            //     dispatch(getUserProfile())
            //     // DISPATCH USER PRODUCTS
            //     dispatch(listMyProducts())
            // }
        }
    }, [dispatch, userInfo, user, success, productCreateSuccess, productUpdateSuccess, successDelete, pageNumber, history])

    const deleteHandler = (id) => {
        if (window.confirm('Táto operácia je nezvratná. Naozaj chcete odstrániť produkt?')) {
            // DISPATCH DELETE PRODUCTS
            dispatch(deleteProduct(id))
        }
    }

    return (
        <Container className='mt-5rem'>
            <Row>
                <Col lg={3} className='my-3'>

                    <h2 className='mb-3 pt-3 fw-600 text-center'>Môj profil</h2>
                    {loading ? <Loader />
                        : error ? <Message>{error}</Message>
                            : user && (
                                <div style={{ border: '0', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                                    <UserInfoPanel user={user} />
                                    <div className='px-2'>
                                        <span className='my-btn-small my-3' style={{ width: '100%' }}> <i className='fas fa-edit'></i> <Link to={'/my/profile/update'}> Aktualizovať </Link> </span>
                                    </div>
                                </div>
                            )}
                </Col>
                <Col lg={9} className='my-3'>
                    <h2 className='mb-3 pt-3 fw-600'>Moje produkty</h2>
                    {loadingProducts ? <Loader />
                        : errorProducts ? <Message>{error}</Message>
                            : products.length === 0 ? <Message variant='info'>Zatiaľ ste nepridali žiadne produkty</Message>
                                :
                                (
                                    <>
                                        <Table striped bordered responsive className='table-sm'>
                                            <thead>
                                                <tr className='text-uppercase'>
                                                    <th className='fw-600 vert-align-midd ' style={{ width: '8%' }}></th>
                                                    <th className='fw-600 vert-align-midd  pl-small-table-td' style={{ width: '25%' }}>Názov</th>
                                                    <th className='fw-600 vert-align-midd text-center' style={{ width: '10%' }}>Typ</th>
                                                    <th className='fw-600 vert-align-midd text-center' style={{ width: '15%' }}>Cena</th>
                                                    <th className='fw-600 vert-align-midd text-center' style={{ width: '17%' }}>Dátum pridania</th>
                                                    <th className='fw-600 vert-align-midd ' style={{ width: '25%' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map(product => (
                                                    <tr key={product._id}>
                                                        <td className='vert-align-midd text-center'><Image src={product.images.length !== 0 ? product.images[0] : '/images/bez-fotky.jpg'} alt={product.name} fluid rounded style={{ maxWidth: '70px' }} /></td>
                                                        <td className='vert-align-midd fw-600 pl-small-table-td' >{product.name}</td>
                                                        <td className='vert-align-midd text-center'>{translateClassification(product.classification)}</td>
                                                        <td className='vert-align-midd text-center fw-400'>{product.price} €</td>
                                                        <td className='vert-align-midd text-center'>{transformDate(product.createdAt.substring(0, 10))}</td>
                                                        <td className='vert-align-midd text-center'>
                                                            <LinkContainer to={`/my/product/edit/${product._id}`}>
                                                                <button className='my-btn-small' >
                                                                    <i className='fas fa-edit'></i> Upraviť
                                                </button>
                                                            </LinkContainer>
                                                            <button className='my-btn-small' onClick={() => deleteHandler(product._id)}>
                                                                <i className='fas fa-trash'></i> Zmazať
                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <Route render={({ history }) => <MyPagination itemsCountPerPage={pageSize} totalItemsCount={count} activePage={page} history={history} screen={1} />} />
                                        {/*  itemsCountPerPage={10} */}
                                        {/* <MyPagination itemsCountPerPage={2} totalItemsCount={count} activePage={page} /> */}
                                    </>
                                )}
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfileScreen
