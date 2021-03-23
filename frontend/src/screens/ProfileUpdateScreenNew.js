import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Image, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserProfile, updateUserProfile } from '../actions/userActions'

const ProfileUpdateScreenNew = ({ history }) => {

    const dispatch = useDispatch()

    // Component level state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profileInfo, setProfileInfo] = useState('')
    const [marketPolicy, setMarketPolicy] = useState('')
    // Change password
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    // Cannot change - profileType, locality
    const [profileType, setProfileType] = useState('')
    const [locality, setLocality] = useState('')

    const [message, setMessage] = useState('')

    // TODO: profileImage
    const [profileImage, setProfileImage] = useState('')    // tu uskladnene url, blob
    const [image, setImage] = useState('')  // tu uskladneny File
    const [uploading, setUploading] = useState(false)

    // is logged
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // get info about logged user
    const userProfile = useSelector(state => state.userProfile)
    const { loading, error, user } = userProfile

    // update logged user
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            // if user update success then redirect
            if (success) {
                history.push('/user/my/profile')
            } else {

                if (!user || !user.name) {
                    // dispatch({ type: USER_UPDATE_PROFILE_RESET })
                    // DISPATCH USER DETAILS
                    dispatch(getUserProfile())
                } else {
                    setName(user.name)
                    setEmail(user.email)
                    setPhoneNumber(user.phoneNumber)
                    setProfileInfo(user.profileInfo)
                    setMarketPolicy(user.marketPolicy)
                    setProfileType(user.profileType)
                    setProfileImage(user.profileImage)
                    setLocality(user.locality)
                    setImage(user.profileImage)
                }
            }
        }
    }, [dispatch, userInfo, user, success, history])

    const uploadFileHandler = async (e) => {
        const file = image//e.target.files[0]  // can upload multiple files
        console.log(file)
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        formData.append('avatar', file)    // image sa vola i v backend
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log(formData)

            const { data } = await axios.post(`/api/upload/profile`, formData, config)
            // setImage(data)
            setUploading(false)
            return data
        } catch (error) {
            console.error(error)
            setUploading(false)
            return error
        }
    }

    const authorizeUser = async (e) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/users/auth', { email, password }, config)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }


    const handleImage = (e) => setImage(e.target.files[0])
    const handlePhoto = (e) => setProfileImage(URL.createObjectURL(e.target.files[0]))

    const imageChangeHandler = async (e) => {
        console.log('Choosed file ', e.target.files[0])
        if (e.target.files[0]) {
            handleImage(e)
            handlePhoto(e)
        }
        // ale napriek tomu sa vypisuje stara hodnota :/
        //await setImage(e.target.files[0])
        //await setProfileImage(URL.createObjectURL(image))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        // Chcem menit heslo 
        if (newPassword && confirmNewPassword) {
            console.log('Chcem menit heslo')

            if (newPassword !== confirmNewPassword) {
                setMessage('Nové heslá sa nezhodujú!')
            } else {
                // zisti ci je spravne aktualne heslo
                // ak je nove heslo aj potvrdene tak zisti ci sa zhoduje stare heslo...
                const isCorrectPassword = await authorizeUser()

                console.log(isCorrectPassword)

                if (isCorrectPassword) {

                    let imgUrl
                    console.log('Toto je image ', image)
                    if (image === user.profileImage) {
                        imgUrl = image
                    }
                    else {
                        imgUrl = await uploadFileHandler()
                    }

                    const updatedUser = {
                        id: user._id, name, email,
                        phoneNumber, profileInfo, marketPolicy,
                        profileImage: imgUrl, password: newPassword
                    }

                    // DISPATCH UPDATE PROFILE
                    dispatch(updateUserProfile(updatedUser))
                    console.log('UPDATE PROFILE')
                } else {
                    setMessage('Nezadali ste spravne aktualne heslo!')
                }
            }
        } else {
            // Nechcem menit heslo
            let imgUrl
            console.log('Toto je image ', image)
            if (image === user.profileImage) {
                imgUrl = image
            }
            else {
                imgUrl = await uploadFileHandler()
            }

            const updatedUser = {
                id: user._id, name, email,
                phoneNumber, profileInfo, marketPolicy,
                profileImage: imgUrl
            }

            console.log(updatedUser)
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile(updatedUser))
            console.log('UPDATE PROFILE')
        }
    }


    return (
        <Container className='mt-5rem'>
            <div>

                {error && <Message>{error}</Message>}

                <Container style={{
                    border: '1px solid rgba(0,0,0,.125)', borderRadius: '0.25rem'
                }} className='card-style'>
                    <Form onSubmit={submitHandler}>
                        <Row>

                            <Col sm={5} className='px-5 py-5' style={{ backgroundColor: '#EEEEEE' }}>
                                <h2 className='fw-500 text-uppercase text-center' style={{ marginBottom: '2.2rem' }}> Môj profil</h2>

                                {/* <Form.Group controlId="profileTypeBox ">
                            <Form.Label className='fs-14px form-check-inline'>Typ profilu</Form.Label>
                            <Form.Control className='form-check-inline ml-2' style={{ width: '130px' }}
                                plaintext readOnly value={profileType === 'user' ? 'fyzická osoba' : 'organizácia'} />
                        </Form.Group> */}

                                <Form.Group controlId='profile-image' className='mt-4 mb-4'>
                                    <div style={{ marginBottom: '2.2rem' }}>
                                        <img src={profileImage} className='profile-pic mx-auto' />
                                    </div>

                                    <Row className='mt-4'>
                                        <Col lg={4}>
                                            <Form.Label className='fs-14px'>Profilová fotka</Form.Label>
                                        </Col>
                                        <Col lg={8}>
                                            <Form.File className='mx-auto text-left' style={{ maxWidth: '17rem' }} id='image-file'
                                                label='Vyberte fotografiu' custom onChange={imageChangeHandler}></Form.File>
                                        </Col>
                                    </Row>
                                    {/* <Form.Control type='text' placeholder='Enter image url' value={image}></Form.Control> */}
                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group controlId='profileInfo'>
                                    <Form.Label className='fs-14px'>Informácie o {profileType && profileType === 'company' ? 'nás' : 'mne'}</Form.Label>
                                    <Form.Control as="textarea" value={profileInfo} onChange={(e) => setProfileInfo(e.target.value)}
                                        placeholder='' rows={4} />
                                </Form.Group>
                            </Col>


                            <Col sm={7} className='px-5 py-5'>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Group controlId='name'>
                                            <Form.Label className='fs-14px'>Užívateľské meno</Form.Label>
                                            <Form.Control type='text' placeholder='Enter name' value={name}
                                                onChange={(e) => setName(e.target.value)} ></Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={4}>
                                        <Form.Group controlId='email'>
                                            <Form.Label className='fs-14px'>Email </Form.Label>
                                            <Form.Control plaintext readOnly value={email} />
                                        </Form.Group>
                                    </Col>

                                    <Col sm={4}>
                                        <Form.Group controlId='phoneNumber'>
                                            <Form.Label className='fs-14px'>Telefónne číslo</Form.Label>
                                            {/* TODO: valid only digits onKeyPress */}
                                            <Form.Control type='text' value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)} ></Form.Control>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Form.Group controlId='locality'>
                                    <Form.Label className=" form-check-inline fs-14px mr-3">Lokalita </Form.Label>
                                    <Form.Control className='form-check-inline' plaintext readOnly value={locality} style={{ width: '80%' }} />
                                </Form.Group>

                                {/* <Form.Group controlId='profileInfo'>
                            <Form.Label className='fs-14px'>Informácie o {profileType && profileType === 'company' ? 'nás' : 'mne'}</Form.Label>
                            <Form.Control as="textarea" value={profileInfo} onChange={(e) => setProfileInfo(e.target.value)}
                                placeholder='' rows={4} />
                        </Form.Group> */}

                                <Form.Group controlId='marketPolicy'>
                                    <Form.Label className='fs-14px'>Podmienky predaja/kúpy/daru</Form.Label>
                                    <Form.Control as="textarea" value={marketPolicy} onChange={(e) => setMarketPolicy(e.target.value)}
                                        placeholder='' rows={4} />
                                </Form.Group>

                                <Form.Label className='fs-14px mb-3'>Zmeniť heslo</Form.Label>
                                {message && <Message>{message}</Message>}

                                {/* <div style={{visibility: 'hidden'}}> */}
                                <Row>
                                    <Col md={4} className='text-center'>
                                        <Form.Group controlId='password'>
                                            <Form.Control className='mainLoginInput mb-0' type='password' placeholder='&#61475;  heslo' value={password}
                                                onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                            <Form.Label className='fs-12px text-muted'>Aktuálne heslo</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className='text-center'>
                                        <Form.Group controlId='newPassword'>
                                            <Form.Control className='mainLoginInput mb-0' type='password' placeholder='&#61475;  nové heslo' value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
                                            <Form.Label className='fs-12px text-muted'>Nové heslo</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className='text-center'>
                                        <Form.Group controlId='confirmNewPassword'>
                                            <Form.Control className='mainLoginInput mb-0' type='password' placeholder='&#61475;  nové heslo' value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}></Form.Control>
                                            <Form.Label className='fs-12px text-muted'>Potvrdiť nové heslo</Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className='text-center'>
                                    <button type='submit' className='my-btn-big mb-1 mt-4 text-uppercase' style={{ width: '70%' }}> Aktualizovať! </button>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                </Container>
            </div >
        </Container>
    )
}

export default ProfileUpdateScreenNew
