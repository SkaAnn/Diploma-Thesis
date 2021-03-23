import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainerBig = ({ children }) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} sm={12} md={10} lg={8} xl={8} className='p-0'>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainerBig
