import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {
    MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage,
    MDBCardTitle, MDBCardHeader, MDBCardFooter, MDBView, MDBMask
} from 'mdbreact';
import { triangleColor, translateClassification } from '../utils/translate'
import { followProduct, unfollowProduct } from '../actions/productActions'

const ProductCard = ({ product }) => {

    const dispatch = useDispatch()

    const [isFavorite, setIsFavorite] = useState(false)
    const [onLoad, setOnLoad] = useState(true)

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo && onLoad) {
            // zisti ci ma produkt medzi oblubenymi
            const isFollower = product.followers.some(item => userInfo._id.toString() === item.toString());
            console.log('Is follower: ', isFollower)
            if (isFollower) setIsFavorite(true)
            setOnLoad(false)
            console.log('onLoad ', onLoad)
        }

        // if (isFavorite && !onLoad) {
        //     console.log('Pridaj medzi oblubene')
        // } else {
        //     console.log('Odober z oblubenych')
        // }
    }, [])

    const addOrRemoveHandler = async (e) => {
        e.preventDefault()
        if (userInfo) {
            console.log(isFavorite)
            await setIsFavorite(!isFavorite)
            console.log(isFavorite)
            if (isFavorite) {
                console.log('odober z oblubenych')
                dispatch(unfollowProduct(product._id))

            } else {
                console.log('pridaj medzi oblubene')
                dispatch(followProduct(product._id))
            }
        } // else redirect to /login
    }

    return (

        // border: 5px solid rgba(0,0,0,.125)
        // box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)
        <MDBCard style={{ width: "16rem" }} className='mx-auto my-3'>


            <MDBView>
                {/* <LinkContainer to={`/product/${product._id}`}> */}
                <img
                    // src="https://mdbootstrap.com/img/Others/documentation/img%20(131)-mini.jpg"
                    src={product.images[0]}
                    className="mx-auto img-fluid"
                    alt={product.name}
                    style={{  minHeight: '12rem', maxHeight: '12rem' }}
                />

                <MDBMask
                    // pattern={1}
                    className="flex-top mt-2 px-3">
                    <span className="badge bg-primary text-uppercase">{translateClassification(product.classification)}</span>

                    {/* <span style={{ float: 'right', zIndex: '100' }} onClick={addOrRemoveHandler} className='card-wrapper'>
                            {isFavorite ?
                                <i className="fas fa-heart fa-lg"></i>
                                : <i className="far fa-heart fa-lg"></i>}
                        </span> */}
                </MDBMask>
                <MDBMask
                    // pattern={1}
                    className="flex">
                    <div className="fixed-right-bottom triangle" style={{ borderColor: ` transparent transparent ${triangleColor(product.condition)}  transparent` }} >
                        {/* <span className='text-uppercase' style={{ zIndex: '2' }}>Novy</span> */}
                    </div>
                </MDBMask>
            </MDBView>

            <span style={{ zIndex: '100' }} onClick={addOrRemoveHandler} className='fixed-right-top curs-pointer mt-2 px-3'>
                {isFavorite ?
                    <i className="fas fa-heart fa-lg"></i>
                    : <i className="far fa-heart fa-lg"></i>}
            </span>


            <MDBCardBody className='card-pad'>
                <Link to={`/product/${product._id}`}>
                    <MDBCardTitle className='text-truncate mb-1' style={{ fontSize: '18px' }}>{product.name}</MDBCardTitle>
                </Link>
                <div className='mb-1' style={{ fontSize: '20px' }}><strong>{product.price}€</strong></div>
                <Link to={`/products/user/${product.user._id}`}>
                    <div className='text-muted' style={{ fontSize: '14px' }}>{product.user.name}</div>
                </Link>
            </MDBCardBody>
        </MDBCard>
    )
}

export default ProductCard;