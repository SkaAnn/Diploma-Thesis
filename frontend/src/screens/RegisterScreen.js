import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainerSmall from '../components/FormContainerSmall'

const RegisterScreen = ({ location, history }) => {
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
    const [display, setDisplay] = useState({ email: true, phone: true })
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
        console.log('Display ',  display)
        if (password !== confirmPassword) {
            setMessage('Heslá sa nezhodujú!')
        } else {
            // DISPATCH REGISTER ACTION
            const newUser = {
                name, email, password,
                phoneNumber, profileImage, profileType,
                locality, display
                // profileInfo, marketPolicy
            }
            dispatch(register(newUser))
        }
    }

    return (
        <Container className='mt-5rem' style={{ marginTop: '20vh', marginBottom: '10vh' }}>
            <FormContainerSmall myHeight='60rem'>
                <div className='mid-align'>
                    <h2 className='text-uppercase fw-600 text-center'>Registrácia</h2>
                    {message && <Message>{message}</Message>}
                    {error && <Message>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} className='form-pad'>

                        <Form.Label className="mb-4 fs-14px text-center w-100" style={{ color: 'red' }}>Všetky položky sú povinné. <br /> Položky označené * sa nedajú zmeniť.</Form.Label>


                        <Form.Group controlId="profileTypeBox" value={profileType} onChange={(e) => setProfileType(e.target.value)}>
                            <Form.Label className="form-check-inline mb-0 fs-14px">Typ profilu* </Form.Label>
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
                            <Form.Label className='mb-0 fs-14px'>Používateľské meno</Form.Label>
                            <Form.Control type='text' className="mainLoginInput login-control" placeholder="&#61447;  používateľské meno" value={name}
                                onChange={(e) => setName(e.target.value)} required
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' style={{ marginBottom: '1.1rem' }}>
                            <Form.Label className='mb-0 fs-14px'>Email*</Form.Label>
                            <Row>
                                <Col md={8}>
                                    <Form.Control type='email' className="mainLoginInput login-control" placeholder="&#x40; email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                                    <Form.Text id="emailBlock" muted> Zadajte platný email, na ktorý Vás môžeme kontaktovať </Form.Text>
                                </Col>
                                <Col md={4}>
                                    <Form.Check inline type='checkbox' name='displayEmail' checked={display.email}
                                        onChange={(e) => setDisplay({ ...display, email: !display.email })} label="zobrazovať verejnosti" className='mt-2 fs-14px text-center' />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId='phoneNumber' style={{ marginBottom: '1.1rem' }}>
                            <Form.Label className='mb-0 fs-14px'>Telefónne číslo</Form.Label>
                            {/* TODO: valid only digits onKeyPress */}
                            <Row>
                                <Col md={8}>
                                    <Form.Control type='text' className="mainLoginInput login-control" placeholder='&#x2706;  telefónne číslo' value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Form.Check inline type='checkbox' name='displayPhone' checked={display.phone}
                                        onChange={(e) => setDisplay({ ...display, phone: !display.phone })} label="zobrazovať verejnosti" className='mt-2 fs-14px text-center' />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId='locality'>
                            <Form.Label className="mb-0 fs-14px">Lokalita</Form.Label>
                            <Form.Control type='text' className="mainLoginInput login-control" placeholder='napr. Bratislava, Slovenská republika' value={locality}
                                onChange={(e) => setLocality(e.target.value)} required
                                style={{ marginBottom: '1.1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label className='mb-0 fs-14px'>Heslo</Form.Label>
                            <Row>
                                <Col sm={6} className='pr-1'>
                                    <Form.Control type='password' className="mainLoginInput login-control mb-2" placeholder="&#61475;  heslo" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required>
                                    </Form.Control>
                                </Col>
                                <Col sm={6} className='pl-1'>
                                    <Form.Control type='password' className="mainLoginInput login-control" placeholder="&#61475;  potvrdiť heslo" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                                </Col>
                            </Row>
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

export default RegisterScreen
