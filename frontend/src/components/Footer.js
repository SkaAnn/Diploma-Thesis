import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer style={{ background: '#593196', color: 'white', minHeight: '7rem' }}>
            <Container >
                <Row style={{ padding: '1rem' }}>
                    <Col className='text-center py-3' style={{ lineHeight: '2rem' }}>
                        Diplomová práca <br />
                        Copyright &copy; Bc. Anna Skachová, 2021 <br />
                        <a href='https://github.com/SkaAnn/'>
                            <i className="fas fa-envelope fa-lg" style={{ color: 'white' }} ></i>
                        </a>&nbsp; &nbsp;
                        <a href='https://github.com/SkaAnn/' style={{ color: 'white' }}>
                            <i className="fab fa-github fa-lg"></i>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer