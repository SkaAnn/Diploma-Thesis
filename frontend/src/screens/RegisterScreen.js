import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'    // login action

// TODO
// min dlzka a zlozitost hesla
// validacia hesla, emailu, telefonneho cisla
// >> osetrenie vkladanych vstupov proti evil input hrozbe
// ratat pocet prihlaseni, ukladat informaciu o poslednom prihlaseni?
// rozdelit na 2 casti? 

const RegisterScreen = ({ location, history }) => {
    // Component level state
    // User model attributes
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profileImage, setProfileImage] = useState('/images/sample-profile.svg')
    const [profileType, setProfileType] = useState('')
    const [locality, setLocality] = useState('')
    const [profileInfo, setProfileInfo] = useState('')
    const [marketPolicy, setMarketPolicy] = useState('')
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
                locality, profileInfo, marketPolicy
            }
            dispatch(register(newUser))
        }
    }

    return (
        <FormContainer>
            <h1>Registrácia</h1>
            { message && <Message>{message}</Message>}
            { error && <Message>{error}</Message>}
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Užívateľské meno* </Form.Label>
                    <Form.Control type='text' placeholder='Zadajte meno' value={name}
                        onChange={(e) => setName(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email* </Form.Label>
                    <Form.Control type='email' placeholder='Zadajte email' value={email}
                        onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Heslo* </Form.Label>
                    <Form.Control type='password' placeholder='Zadajte heslo' value={password}
                        onChange={(e) => setPassword(e.target.value)} required ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Potvrďte heslo* </Form.Label>
                    <Form.Control type='password' placeholder='Opätovne zadajte heslo' value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Telefónne číslo</Form.Label>
                    {/* TODO: valid only digits onKeyPress */}
                    <Form.Control type='text' placeholder='+421 9xx xxx xxx' value={phoneNumber}  
                        onChange={(e) => setPhoneNumber(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId="profileTypeBox" value={profileType} onChange={(e) => setProfileType(e.target.value)}>
                    <Form.Label className="form-check-inline">Druh užívateľa* </Form.Label>
                    <Form.Check className="form-check-inline" type="radio" name='condition' value='user' label="fyzická osoba" required />
                    <Form.Check className="form-check-inline" type="radio" name='condition' value='company' label="organizácia" required />
                </Form.Group>

                <Form.Group controlId='locality'>
                    <Form.Label>Lokalita</Form.Label>
                    <Form.Control type='text' placeholder='napr. Bratislava, Slovenská republika' value={locality}
                        onChange={(e) => setLocality(e.target.value)} required ></Form.Control>
                </Form.Group>

                <Form.Group controlId='profileInfo'>
                    <Form.Label>Informácie o {profileType && profileType == 'company' ? 'nás' : 'mne'}</Form.Label>
                    <Form.Control as="textarea" value={profileInfo} onChange={(e) => setProfileInfo(e.target.value)}
                        placeholder='' rows={3} />
                </Form.Group>
                
                <Form.Group controlId='marketPolicy'>
                    <Form.Label>Podmienky predaja/kúpy</Form.Label>
                    <Form.Control as="textarea" value={marketPolicy} onChange={(e) => setMarketPolicy(e.target.value)}
                        placeholder='' rows={3} />
                </Form.Group>

                <Button type='submit' variant='primary'>Zaregistruj!</Button>
                <Row className='py-3'>
                    <Col> Už máš konto? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Prihlás sa!</Link></Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
