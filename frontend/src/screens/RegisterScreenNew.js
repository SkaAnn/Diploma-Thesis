import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainerSmall from '../components/FormContainerSmall'

const RegisterScreenNew = ({ location, history }) => {
    // Component level state
    // User model attributes
    const [profileType, setProfileType] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [locality, setLocality] = useState('')
    const [profileImage, setProfileImage] = useState('/images/sample-profile.svg')
    // Tieto spolu s fotkou neskor...
    // const [profileInfo, setProfileInfo] = useState('')
    // const [marketPolicy, setMarketPolicy] = useState('')
    // favoriteProducts set automatically

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
            const newUser = {
                name, email, password,
                phoneNumber, profileImage, profileType,
                locality,
                // profileInfo, marketPolicy
            }
            dispatch(register(newUser))
        }
    }

    return (
        <Container className='mt-5rem'>
            <FormContainerSmall myHeight='55rem'>
                <div className='mid-align'>
                    <h2 className='text-uppercase fw-500 text-center mb-3'>Registrácia</h2>
                    {message && <Message>{message}</Message>}
                    {error && <Message>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} className='form-pad'>

                        <Form.Group controlId="profileTypeBox" value={profileType} onChange={(e) => setProfileType(e.target.value)}>
                            <Form.Label className="form-check-inline mb-0 fs-14px font-italic">Typ profilu* </Form.Label>
                            <div className='disp-block'>
                                <Form.Check className="form-check-inline pl-3" type="radio" name='condition' value='user' label="fyzická osoba" required />
                                <Form.Check className="form-check-inline pl-3" type="radio" name='condition' value='company' label="organizácia" required />
                            </div>
                        </Form.Group>

                        {/* <Form.Group controlId='locality' className='form-check-inline mr-0 w-100'>
                        <Form.Label className="form-check-inline mb-0 fs-14px font-italic">Lokalita* </Form.Label>
                        <Form.Control type='text' className="mainLoginInput login-control ml-3" placeholder='napr. Bratislava, Slovenská republika' value={locality}
                            onChange={(e) => setLocality(e.target.value)} required ></Form.Control>
                    </Form.Group> */}

                        {/* form-check-inline */}
                        <Form.Group controlId='name'>
                            <Form.Label className='mb-0 fs-14px font-italic'>Užívateľské meno*</Form.Label>
                            <Form.Control type='text' className="mainLoginInput login-control" placeholder="&#61447;  MENO" value={name}
                                onChange={(e) => setName(e.target.value)} required
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label className='mb-0 fs-14px font-italic'>Email*</Form.Label>
                            <Form.Control type='email' className="mainLoginInput login-control" placeholder="&#x40; EMAIL" value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='phoneNumber'>
                            <Form.Label className='mb-0 fs-14px font-italic'>Telefónne číslo*</Form.Label>
                            {/* TODO: valid only digits onKeyPress */}
                            <Form.Control type='text' className="mainLoginInput login-control" placeholder='&#x2706;  TELEFÓNNE ČÍSLO' value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='locality'>
                            <Form.Label className="mb-0 fs-14px font-italic">Lokalita* </Form.Label>
                            <Form.Control type='text' className="mainLoginInput login-control" placeholder='napr. Bratislava, Slovenská republika' value={locality}
                                onChange={(e) => setLocality(e.target.value)} required
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label className='mb-0 fs-14px font-italic'>Heslo*</Form.Label>
                            <Form.Control type='password' className="mainLoginInput login-control mb-2" placeholder="&#61475;  HESLO" value={password}
                                onChange={(e) => setPassword(e.target.value)} required>
                            </Form.Control>
                            {/* </Form.Group>

                    <Form.Group controlId='confirmPassword'> */}
                            {/* <Form.Label>Potvrďte heslo* </Form.Label> */}
                            <Form.Control type='password' className="mainLoginInput login-control" placeholder="&#61475;  POTVRDIŤ HESLO" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                        </Form.Group>

                        {/* <Button  variant='primary'>Prihlásiť!</Button> */}
                        <button type='submit' className='my-btn-big my-3 text-uppercase' style={{ width: '100%' }}> Zaregistruj! </button>
                    </Form>



                    <Row className='pb-3 pt-2'>
                        <Col className='text-center fs-14px'> Už máš konto? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Prihlás sa!</Link></Col>
                    </Row>
                </div>
            </FormContainerSmall>
        </Container>
    )
}

export default RegisterScreenNew
