import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainerSmall from '../components/FormContainerSmall'

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
        <Container className='mt-5rem' style={{marginTop: '20vh'}}>
        <FormContainerSmall myHeight='30rem'>
            <div className='mid-align'>
                <h2 className='text-uppercase fw-600 text-center mb-3'>Prihlásenie</h2>
                {error && <div className='mx-4'><Message>{error}</Message></div>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className='form-pad'>

                    <Form.Group controlId='email'>
                        {/* <Form.Label>Email</Form.Label> */}
                        <Form.Control type='email' className="mainLoginInput login-control" placeholder="&#x40; EMAIL" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ marginBottom: '2rem' }} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        {/* <Form.Label>Heslo</Form.Label> */}
                        <Form.Control type='password' className="mainLoginInput login-control" placeholder="&#61475;  HESLO" value={password}
                            onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                    </Form.Group>
                    {/* <Button  variant='primary'>Prihlásiť!</Button> */}
                    <button type='submit' className='my-btn-big my-3 text-uppercase' style={{ width: '100%' }}> Prihlásiť! </button>
                </Form>
                <Row className='pb-3 pt-2'>
                    <Col className='text-center fs-14px'> Ešte nemáte konto? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zaregistrujte sa u nás!</Link></Col>
                </Row>
            </div>
        </FormContainerSmall>
        </Container>
    )
}

export default LoginScreen
