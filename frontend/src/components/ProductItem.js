import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'

const ProductItem = ({ product }) => {

    const chooseCondition = (condition) => {
        switch (condition) {
            case "1":
                return 'NOVÝ TOVAR'
            case "2":
                return 'POUŽITÝ TOVAR'
            case "3":
                return 'VLASTNÁ VÝROBA' // RUČNÁ
            default:
                return ""
        }
    }

    const badgeType = (condition) => {
        switch (condition) {
            case "1":
                return 'badge badge-success'
            case "2":
                return 'badge badge-primary'
            case "3":
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
                    <Col xs={6}> {product.classification} </Col>
                    <Col xs={6} style={{ textAlign: 'right' }}>
                        <i className="far fa-star" ></i>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Img variant="top" className='card-img-top' src="/images/sample.jpg" />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Row>
                    <Col s={6} style={{ margin: 'auto' }}>
                        <span className={badgeType(product.condition)}>{chooseCondition(product.condition)}</span>
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
