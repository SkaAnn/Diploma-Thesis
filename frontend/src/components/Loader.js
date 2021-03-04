import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Container>
            <Spinner animation='border'
                role='status'
                style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </Container>
    )
}

export default Loader