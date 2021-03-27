import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Image } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFavoriteProducts } from '../actions/productActions'
import { getCategoryName } from '../utils/translate'
import MyPagination from '../components/MyPagination'

const FavoriteProductsScreen = ({ history, match }) => {
    const pageSize = 3  // TODO 10
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productListFavorite = useSelector(state => state.productListFavorite)
    const { loading, error, products, count, pages, page } = productListFavorite

    useEffect(() => {
        // user must be login
        if (!userInfo) {
            history.push('/login')
        }
        dispatch(listFavoriteProducts(pageNumber, pageSize))
    }, [dispatch, userInfo, history, pageNumber])

    return (
        <Container className='mt-5rem'>
            <Row>
                <Col>
                    <h2 className='fw-400 text-uppercase mb-4'> <i className="far fa-heart mr-1" style={{ color: 'pink' }}></i> Obľúbené ({count})</h2>
                    {loading ? <Loader />
                        : error ? <Message>{error}</Message>
                            : products.length === 0 ? <Message variant='info'>Zatiaľ nemáte pridané žiadne produkty medzi obľúbenými</Message>
                                : (<Table responsive className='table-sm'>
                                    <thead>
                                        <tr className='text-uppercase'>
                                            {/* https://stackoverflow.com/questions/15115052/how-to-set-up-fixed-width-for-td */}
                                            <th className='fw-600' style={{ width: '9%' }}></th>
                                            <th className='fw-600 pl-table-td' style={{ width: '24%' }}>Názov</th>
                                            <th className='fw-600' style={{ width: '24%' }}>Kategória</th>
                                            <th className='fw-600' style={{ width: '12%' }}>Cena</th>
                                            <th className='fw-600' style={{ width: '14%' }}>Dátum pridania</th>
                                            <th className='fw-600' style={{ width: '17%' }} >Vlastník</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id} >
                                                <td className='vert-align-midd'> <Image src={product.images[0]} alt={product.name} fluid rounded style={{ maxWidth: '80px' }} /></td>
                                                <td className='vert-align-midd fw-600 pl-table-td'><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                                                <td className='vert-align-midd'>{getCategoryName(product.category)}</td>
                                                <td className='vert-align-midd'>{product.price}</td>
                                                <td className='vert-align-midd'>{product.createdAt.substring(0, 10)}</td>
                                                <td className='vert-align-midd'><Link to={`/products/user/${product.user._id}`}>{product.user.name}</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>)}
                    <Route render={({ history }) => <MyPagination itemsCountPerPage={pageSize} totalItemsCount={count} activePage={page} history={history} screen={2} />} />
                </Col>
            </Row>
        </Container>
    )
}

export default FavoriteProductsScreen
