import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'   // URL query string

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <FormContainer>
            <h1>Prihlásenie</h1>
            <Message>Toto je error message</Message>
            {/* { error && <Message variant='danger'>{error}</Message>} */}
            {/* { loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Zadajte email' value={email}
                        onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control type='password' placeholder='Zadajte password' value={password}
                        onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Prihlásiť!</Button>
                <Row className='py-3'>
                    {/* rovno po registracii nas prepne na uvodnu stranku */}
                    <Col> Ešte nemáte konto? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zaregistrujte sa u nás!</Link></Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
