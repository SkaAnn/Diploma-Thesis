import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'    // login action

const RegisterScreen = ({ location, history }) => {
    // Component level state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'   // URL query string

    useEffect(() => {
        // Redirect when we are sign in
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        setMessage('')
        if (password !== confirmPassword) {
            setMessage('Heslá sa nezhodujú!')
        } else {
            // DISPATCH REGISTER ACTION
            dispatch(register(name, email, password))
        }
    }

    return (
        <Container className='sticky-top mt-4'>
            <FormContainer>
                <h1>Registrácia</h1>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Užívateľské meno</Form.Label>
                        <Form.Control type='name' placeholder='Zadajte meno' value={name}
                            onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Zadajte email' value={email}
                            onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control type='password' placeholder='Zadajte heslo' value={password}
                            onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Potvrďte heslo</Form.Label>
                        <Form.Control type='password' placeholder='Opätovne zadajte heslo' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Zaregistruj!</Button>
                    <Row className='py-3'>
                        <Col> Už máš konto? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Prihlás sa!</Link></Col>
                    </Row>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default RegisterScreen
