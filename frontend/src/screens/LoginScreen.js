import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'   

const LoginScreen = ({ location, history }) => {
    // Component level state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    // Application (Global) level state
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin  // from userLoginReducer in store.js

    const redirect = location.search ? location.search.split('=')[1] : '/'   // URL query string

    useEffect(() => {
        // redirect when we are sign in
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH LOGIN ACTION
        dispatch(login(email, password))   // login from userActions.js
    }

    return (
        <FormContainer>
            <h1>Prihlásenie</h1>
            { error && <Message>{error}</Message>}
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>Prihlásiť!</Button>
                <Row className='py-3'>
                    <Col> Ešte nemáte konto? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zaregistrujte sa u nás!</Link></Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
