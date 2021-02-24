import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Tabs from '../components/Tabs'

const ProductScreen = () => {
    return (
        <>
            <Row>
                <Col md='6'>
                    <Row>
                        <Col size='6'><i className="far fa-star" ></i> Ulož</Col>
                        <Col size='6' style={{ textAlign: 'right' }}>PONUKA</Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                {/* LAVA CAST OBRAZOVKY */}
                <Col md='6'>
                    <Card className='my-3 p-3 rounded'>
                        <img src='/images/sample.jpg' alt='obrazok produktu ' />
                    </Card>
                </Col>

                {/* PRAVA CAST OBRAZOVKY */}
                <Col md='6' style={{ marginTop: '1rem' }}>
                    <p>anicka123</p>
                    <h2>Detské ponožky</h2>
                    <h3>12.50e</h3>
                    <p>Nový tovar</p>
                    <p>Bratislava</p>
                </Col>
            </Row>

            <Row>
                <Col md='6'>
                    <Tabs />
                </Col>
            </Row>

        </>
    )
}

export default ProductScreen
