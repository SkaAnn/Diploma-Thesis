import DOMPurify from 'dompurify'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import Message from '../components/Message'
import Loader from '../components/Loader'
import ImageCarousel from '../components/ImageCarousel'
import { Table } from 'react-bootstrap'
import emailjs from 'emailjs-com';

import { env } from '../config'
import { listProductDetails } from '../actions/productActions'
import { translateClassification, translateCondition, getCategoryName, transformDate } from '../utils/translate'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()
    const productId = match.params.id

    const [activeItem, setActiveItem] = useState('1');
    const toggle = tab => e => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
    };

    const [show, setShow] = useState(false)
    const [feedback, setFeedback] = useState('')

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!product || !product.name) {
            dispatch(listProductDetails(productId))
        } else {

            if (productId !== product._id) {
                dispatch(listProductDetails(productId))
            }
        }
    }, [dispatch, product, productId]) 

    const onClickHandler = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    // Note: this is using default_service, which will map to whatever
    // default email provider you've set in your EmailJS account.
    const sendFeedback = ({
        templateId,
        senderEmail,
        receiverEmail,
        feedback,
        user,
    }) => {
        emailjs.send(
            'default_service',
            templateId,
            {
                sender_email: senderEmail,
                receiver_email: receiverEmail,
                sender_name: userInfo.name,
                product_name: product.name,
                message: feedback,
            },
            user
        )
            .then((res) => {
                if (res.status === 200) {
                    setFormSubmitSuccessful(true);
                }
            })
            // Handle errors here however you like
            .catch((err) => console.error('Failed to send feedback. Error: ', err));
    };


    const submitHandler = (e) => {
        e.preventDefault()

        const {
            REACT_APP_EMAILJS_TEMPLATEID: templateId,
            REACT_APP_EMAILJS_USERID: user,
        } = env;

        const receiverEmail = product.user.email
        const senderEmail = userInfo.email 

        sendFeedback({
            templateId,
            senderEmail,
            receiverEmail,
            feedback,
            user,
        });

        setFormSubmitted(true);
    }


    if (formSubmitted && formSubmitSuccessful) {
        setShow(false)
        setFormSubmitted(false)
    }


    return (<>

        <div className="fadeMe" style={{ display: `${show ? 'block' : 'none'}`, verticalAlign: 'middle' }}>
            <i className="fas fa-times fa-3x"
                style={{ position: 'absolute', top: '1.5rem', right: '10%', cursor: 'pointer', color: 'gray' }}
                onClick={onClickHandler} />
            <div style={{ width: '100%', height: '100%', display: 'table' }}>
                <div className='m-auto' style={{
                    display: 'table-cell',
                    verticalAlign: 'middle'
                }}>

                    {formSubmitted ? <Loader /> :
                        <div className='p-4' style={{ backgroundColor: 'white', width: '50%', minHeight: '50%', margin: 'auto', minWidth: '350px' }}>
                            <h2 className='fw-400 mb-3'>  <i className="far fa-paper-plane mr-2"></i> Správa pre používateľa <span className='fw-800'>{product && product.user.name}</span></h2>
                            <p className='text-justify'>Ak máte záujem o produkt <strong>{product && product.name}</strong>, napíšte správu vlastníkovi. V správe nezabudnite na pekné oslovenie. :)</p>

                            <Form onSubmit={submitHandler}>
                                <Form.Label><strong>Text správy</strong></Form.Label>
                                <Form.Control as="textarea" onChange={(e) => setFeedback(DOMPurify.sanitize(e.target.value))}
                                    placeholder='Dobrý deň, ...' rows={6} required className='mb-3' />
                                <div className='text-center'><button type='submit' className='my-btn-primary fw-500 w-100 fs-18px'> Odoslať </button></div>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        </div >

        <Container className='mt-5rem'>
            {loading ? <Loader />
                : error ? <div style={{ marginTop: '6rem' }}><Message>{error}</Message></div>
                    :
                    product.active === false ? <div style={{ marginTop: '6rem' }}><Message>Ľutujeme, tento produkt bol vymazaný.</Message></div> :
                        (
                            <div className='pt-4'>
                                <Row>
                                    <Col md='6'>
                                        <Link to='/'><i className="fas fa-home" style={{color: '#3f599e'}}/></Link> &gt; <Link to={`/products/user/${product.user._id}`} style={{color: '#3f599e'}}>{product.user.name}</Link> &gt; <strong>{getCategoryName(product.category)}</strong> &gt; {product.name}
                                    </Col>
                                </Row>

                                <Row className='mt-3'>
                                    {/* Left part of the screen */}
                                    <Col md='6' className='mb-2'>
                                        <ImageCarousel images={product.images} />
                                    </Col>

                                    {/* Right part of the screen */}
                                    <Col md='6' >

                                        <div className='border px-4 py-4'>
                                            <h3 className=' fw-400 mb-3'>{product.name} </h3>

                                            <Row>
                                                <Col md={6}>
                                                    <h2 className=' fw-500 mb-3'>
                                                        {product.price !== 0 ? (product.classification === 'demand' ? 'Dohodou' : `${product.price}€  / ks`)
                                                            : 'Zadarmo'}
                                                    </h2>
                                                    <span>dostupnosť: {product.countInStock} ks</span>
                                                </Col>
                                                <Col md={6} styles={{paddingTop: '20px'}}>
                                                    {formSubmitSuccessful
                                                        ? <span> Správa bola úspešne odoslaná! </span>
                                                        :
                                                        userInfo &&
                                                        <button className='my-btn-primary mt-4 fw-500' style={{ float: 'right' }} onClick={onClickHandler}>
                                                            <i className="far fa-paper-plane mr-1"></i> Mám záujem</button>
                                                    }
                                                </Col>
                                            </Row>


                                        </div>

                                        <Row style={{ margin: 'inherit', backgroundColor: '#e9ecef' }} className='text-center py-2'>
                                            <Col lg={3} className='py-1 m-auto fs-14px'> <i className="far fa-user mr-1"></i> {product.user.name} </Col>
                                            <Col lg={3} className='py-1 m-auto fs-14px'> <i className="far fa-clock mr-1"></i> {product.createdAt && transformDate(product.createdAt.substring(0, 10))} </Col>
                                            <Col lg={3} className='py-1 m-auto fs-14px fw-500' style={{ letterSpacing: '0' }}> <i className="fas fa-tag mr-1"></i> {translateClassification(product.classification)} </Col>
                                            <Col lg={3} className='py-1 m-auto fs-14px fw-500' style={{ letterSpacing: '0' }}> <i className="far fa-gem mr-1"></i> {translateCondition(product.condition)} </Col>
                                        </Row>

                                        <div>
                                            <MDBNav className="nav-tabs mt-5">
                                                <MDBNavItem>
                                                    <MDBNavLink style={{color:'rgb(63, 89, 158)'}} link to="#" active={activeItem === '1'} onClick={toggle("1")} role="tab" >
                                                        Popis
                                            </MDBNavLink>
                                                </MDBNavItem>
                                                <MDBNavItem>
                                                    <MDBNavLink style={{color:'rgb(63, 89, 158)'}} link to="#" active={activeItem === '2'} onClick={toggle("2")} role="tab" >
                                                        Špecifikácia
                                            </MDBNavLink>
                                                </MDBNavItem>
                                                <MDBNavItem>
                                                    <MDBNavLink style={{color:'rgb(63, 89, 158)'}} link to="#" active={activeItem === '3'} onClick={toggle("3")} role="tab" >
                                                        Doprava a doručenie
                                                    </MDBNavLink>
                                                </MDBNavItem>
                                            </MDBNav>
                                            <MDBTabContent activeItem={activeItem} >
                                                <MDBTabPane tabId="1" role="tabpanel">
                                                    <p className="mt-3 px-1 text-justify fs-15px">
                                                        {product.description}
                                                    </p>
                                                </MDBTabPane>


                                                <MDBTabPane tabId="2" role="tabpanel">
                                                    <h6 className='text-uppercase fw-600 mt-3'>Základné vlastnosti</h6>
                                                    <Table striped size='sm' className='mt-2'>
                                                        <tbody>
                                                            <tr>
                                                                <td>pôvod</td>
                                                                <td>{product.origin}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>výrobca</td>
                                                                <td>{product.brand === '' ? '-' : product.brand}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>šírka x výška x hĺbka</td>
                                                                {product.measures !== undefined &&
                                                                    <td>{product.measures.width === '' ? '-' : product.measures.width + 'cm'} x {product.measures.height === '' ? '-' : product.measures.height + 'cm'} x {product.measures.depth === '' ? '-' : product.measures.depth + 'cm'}</td>}
                                                            </tr>
                                                            <tr>
                                                                <td>hmotnosť</td>
                                                                {(product.measures !== undefined) && <td>{product.measures.weight === '' ? '-' : product.measures.weight + 'g'} </td>}
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                    <h6 className='text-uppercase fw-600 mt-3'>Ďalšie vlastnosti</h6>

                                                    {product.moreProperties !== undefined &&
                                                        <>
                                                            {product.moreProperties.length === 0 && <div className='mt-2'><Message variant='info'>Táto časť je prázdna</Message></div>}

                                                            <Table striped size='sm' className='mt-2'>
                                                                <tbody>
                                                                    {product.moreProperties.map((item, index) =>
                                                                        <tr key={index}>
                                                                            <td>{item.key}</td>
                                                                            <td>{item.val}</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </>
                                                    }
                                                </MDBTabPane>


                                                <MDBTabPane tabId="3" role="tabpanel">
                                                    {product.shipping !== undefined &&
                                                        <>
                                                            {product.shipping.length === 0 && <div className='mt-3'><Message variant='info'>Táto časť je prázdna</Message></div>}

                                                            <Table striped size='sm' className='mt-3'>
                                                                <tbody>
                                                                    {product.shipping.map((item, index) =>
                                                                        <tr key={index}>
                                                                            <td>{item.typ}</td>
                                                                            <td>{item.price}</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </>
                                                    }

                                                </MDBTabPane>
                                            </MDBTabContent>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        )
            }
        </Container>
    </>
    )
}

export default ProductScreen
