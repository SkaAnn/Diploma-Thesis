import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { translateCondition, translateClassification } from '../utils/translate'
import { followProduct, unfollowProduct } from '../actions/productActions'

const ProductItem = ({ product }) => {
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

    const badgeType = (condition) => {
        switch (condition) {
            case "new":
                return 'badge badge-success'
            case "used":
                return 'badge badge-primary'
            case "handmade":
                return 'badge badge-secondary'
            default:
                return ''
        }
    }

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

    // ponuka #DCE775
    // dopyt - #FFCC80 rgb(254, 216, 177) #ffe0b2
    // darujem #F48FB1 // #F48FB1

    return (
        // TODO upravit kvoli responzivite...
        <Card className='my-3 rounded' style={{ width: '15rem' }}>
            <Card.Header style={{ backgroundColor: '#FED8B1' }}>
                <Row>
                    <Col size='6'> {translateClassification(product.classification)} </Col>
                    <Col size='6' style={{ textAlign: 'right' }}>
                        <span id="grid" onClick={addOrRemoveHandler}>
                            {isFavorite ?
                                <i className="fas fa-star"></i>
                                : <i className="far fa-star" ></i>}
                        </span>
                    </Col>
                </Row>
            </Card.Header>

            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" className='card-img-top' src={product.images[0]} />
            </Link>

            <Card.Body>
                <Card.Title>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </Card.Title>

                <Row>
                    <Col s={6} style={{ margin: 'auto' }}>
                        <span className={badgeType(product.condition)}>{translateCondition(product.condition)}</span>
                    </Col>
                    <Col s={6} style={{ fontSize: '1.7rem', textAlign: 'right' }}>
                        <strong>{product.price}€</strong>
                    </Col>
                </Row>
                <Card.Text>
                    <Link to={`/products/user/${product.user._id}`}>
                        <i className='far fa-user'></i> &nbsp; {product.user.name}
                    </Link>
                    <span> • </span> USER_CITY </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default ProductItem
