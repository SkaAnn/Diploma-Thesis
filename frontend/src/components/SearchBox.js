import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    // component state keyword
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline className='mt-1rem'>
            <Row className='ml-sm-3 mx-0'>
                <Col className='p-0 col-8'>
                    <Form.Control type='text' name='q' placeholder='Vyhľadaj...'
                        onChange={(e) => setKeyword(e.target.value)}
                        className='search-box mr-sm-2' style={{ fontSize: '14px', width: 'inherit' }}></Form.Control>
                </Col>
                <Col className='p-0 ml-3 col-3'>
                    <button type='submit' className='header-button'><i className="fas fa-search"></i> Vyhľadať</button>
                    {/* <Button type='submit' variant='outline-success' className='p-2'>Vyhľadať</Button> */}
                </Col>
            </Row >
        </Form >
    )
}

export default SearchBox
