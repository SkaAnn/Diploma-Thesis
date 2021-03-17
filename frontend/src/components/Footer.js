import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer style={{ background: '#78f5d6', minHeight: '7rem' }}>
            <Container >
                <Row className='fs-14px py-4 px-3'>
                    <Col className='col-md-4' style={{ lineHeight: '2rem' }}>
                        <span className='text-uppercase'> Diplomová práca </span> <br/>
                        <span className='fw-600'>Bc. Anna Skachová </span> <br/>

                        <a href='https://github.com/SkaAnn/' style={{color: 'black'}}> 
                            <i className="fas fa-at fa-lg mr-1"></i> skachova@stuba.sk
                        </a> <br/>
                        <a href='https://github.com/SkaAnn/' style={{color: 'black'}}>
                            <i className="fab fa-github fa-lg  mr-1"></i> SkaAnn
                        </a>
                    </Col>
                </Row>
            </Container>
            <div className='text-center py-2' style={{ background: 'rgb(112 227 199)'}}>
                &copy; {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer