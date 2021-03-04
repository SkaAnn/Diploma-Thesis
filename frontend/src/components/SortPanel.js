import React, { useState } from 'react'
import { Row, Form, Button, Col } from 'react-bootstrap'

const SortPanel = ({ history }) => {
    const [sortKey, setSortKey] = useState()

    // console.log(`init sortKey: ${sortKey}`)

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(`sortKey: ${sortKey}`)
        if (sortKey === '') {
            history.push('/')
        } else {
            history.push(`/sort/${sortKey}`)
        }
    }

    return (

        <Form onSubmit={submitHandler} inline>
            <Row className='w-100'>
                <Col md='3'>
                    <Button type='submit' onClick={(e) => setSortKey('')} variant='outline-success' className='p-2'>
                        Najnovšie</Button>
                </Col>
                <Col md='3'>
                    <Button type='submit' onClick={(e) => setSortKey('time_desc')} variant='outline-success' className='p-2'>
                        Najstaršie</Button>
                </Col>
                <Col md='3'>
                    <Button type='submit' onClick={(e) => setSortKey('price_asc')} variant='outline-success' className='p-2'>
                        Najlacnejšie</Button>
                </Col>
                <Col md='3'>
                    <Button type='submit' onClick={(e) => setSortKey('price_desc')} variant='outline-success' className='p-2'>
                        Najdrahšie</Button>
                </Col>
            </Row>
        </Form>

    )
}

export default SortPanel
