import React from 'react'
import { Container } from 'react-bootstrap'

const My404Screen = () => {
    return (
        <Container>
            <h1 className='fw-500'
                style={{
                    margin: '0',
                    position: 'absolute',
                    top: '50%',
                    // -ms-transform: translateY(-50%);
                    transform: 'translateY(-120%)'
                }}> 404 Táto stránka neexistuje </h1>
        </Container>
    )
}

export default My404Screen
