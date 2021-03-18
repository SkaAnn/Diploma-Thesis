import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainerSmall = ({ children, myHeight}) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={11} sm={11} md={7} lg={5} xl={5} className='m-auto p-4 card-style'
                    style={{ height: `${myHeight}`, position: 'relative' }} >
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainerSmall
