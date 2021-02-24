import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { translateCondition, translateClassification } from '../utils/translate'

const ProductItem = ({ product }) => {

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
                        <i className="far fa-star" ></i>
                    </Col>
                </Row>
            </Card.Header>

            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" className='card-img-top' src="/images/sample.jpg" />
            </Link>

            <Card.Body>
                <Card.Title>
                    <Link to={`/product/${product._id}`}>{product.title}</Link>
                </Card.Title>

                <Row>
                    <Col s={6} style={{ margin: 'auto' }}>
                        <span className={badgeType(product.condition)}>{translateCondition(product.condition)}</span>
                    </Col>
                    <Col s={6} style={{ fontSize: '1.7rem', textAlign: 'right' }}>
                        <strong>{product.price}€</strong>
                    </Col>
                </Row>
                <Card.Text><i className='far fa-user'></i> &nbsp; USER_NAME <span> • </span> USER_CITY </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default ProductItem
