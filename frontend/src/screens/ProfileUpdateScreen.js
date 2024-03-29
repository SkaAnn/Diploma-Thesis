import axios from 'axios'
import DOMPurify from 'dompurify'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateUserProfile } from '../actions/userActions'

const ProfileUpdateScreen = ({ history }) => {

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
    const [display, setDisplay] = useState('')

    const [message, setMessage] = useState('')

    // ProfileImage
    const [profileImage, setProfileImage] = useState('')    // stored URL in blob
    const [image, setImage] = useState('')  // stored File
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
                history.push('/my/profile')
            } else {

                if (!user || !user.name) {
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
                    setDisplay(user.display)
                }
            }
        }
    }, [dispatch, userInfo, user, success, history])

    const deleteImage = () => {
        setProfileImage('')
        setImage('')
    }

    const uploadFileHandler = async (e) => {
        const file = image // can upload multiple files
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        formData.append('avatar', file)    // image is called avatar on backend
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`/api/upload/profile`, formData, config)
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

            await axios.post('/api/users/auth', { email, password }, config)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }


    const handleImage = (e) => setImage(e.target.files[0])
    const handlePhoto = (e) => setProfileImage(URL.createObjectURL(e.target.files[0]))

    const imageChangeHandler = async (e) => {
        if (e.target.files[0]) {
            handleImage(e)
            handlePhoto(e)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        // Want to change password 
        if (newPassword && confirmNewPassword) {
            if (newPassword !== confirmNewPassword) {
                setMessage('Nové heslá sa nezhodujú!')
            } else {
                // Is new password correct?
                // Is actual password corresponding with old password?
                const isCorrectPassword = await authorizeUser()

                if (isCorrectPassword) {

                    let imgUrl
                    if (image === user.profileImage) {
                        imgUrl = image
                    }
                    else {
                        if (image !== '') {
                            imgUrl = await uploadFileHandler()
                        } else {
                            imgUrl = '/images/profile-photo.png'
                        }
                    }

                    const updatedUser = {
                        id: user._id, name, email,
                        phoneNumber, profileInfo, marketPolicy,
                        profileImage: imgUrl, password: newPassword
                    }

                    // DISPATCH UPDATE PROFILE
                    dispatch(updateUserProfile(updatedUser))
                } else {
                    setMessage('Nezadali ste správne aktuálne heslo!')
                }
            }
        } else {
            // Dont want to change password
            let imgUrl
            if (image === user.profileImage) {
                imgUrl = image
            }
            else {
                if (image !== '') {
                    imgUrl = await uploadFileHandler()
                } else {
                    imgUrl = '/images/profile-photo.png'
                }
            }

            const updatedUser = {
                id: user._id, name, email,
                phoneNumber, profileInfo, marketPolicy, display,
                profileImage: imgUrl
            }

            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile(updatedUser))
        }
    }


    return (
        <Container className='mt-5rem'>
            <div>
                {error && <Message>{error}</Message>}
                <LinkContainer to='/my/profile' >
                    <h6 className=' pt-4 fw-600 curs-pointer'><i className="fas fa-arrow-left"></i> Späť</h6>
                </LinkContainer>
                <Container style={{
                    border: '1px solid rgba(0,0,0,.125)', borderRadius: '0.25rem', marginTop: '1.7rem'
                }} className='card-style mb-4'>
                    <Form onSubmit={submitHandler}>
                        <Row>

                            <Col sm={5} className='px-5 py-5' style={{ backgroundColor: '#EEEEEE' }}>
                                <h2 className='fw-600 text-center' style={{ marginBottom: '2.2rem' }}> Môj profil</h2>

                                <Form.Group controlId='profile-image' className='mt-4 mb-4'>
                                    <div style={{ marginBottom: '2.2rem' }} onClick={deleteImage}>
                                        <img src={profileImage !== '' ? profileImage : '/images/profile-photo.png'} alt='profilePhoto' className='profile-pic mx-auto' />
                                    </div>

                                    <Row className='mt-4'>
                                        <Col lg={4}>
                                            <Form.Label className='fs-14px'>Profilová fotka</Form.Label>
                                        </Col>
                                        <Col lg={8}>
                                            <Form.File className='mx-auto text-left' style={{ maxWidth: '17rem' }} id='image-file'
                                                label='Vyberte fotografiu' custom onChange={imageChangeHandler}></Form.File>
                                            <Form.Text id="photoBlock" muted>Kliknutím na profilovú fotku ju vymažete. </Form.Text>
                                        </Col>
                                    </Row>

                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group controlId='profileInfo'>
                                    <Form.Label className='fs-14px'>Informácie o {profileType && profileType === 'company' ? 'nás' : 'mne'}</Form.Label>
                                    <Form.Control as="textarea" value={profileInfo} onChange={(e) => setProfileInfo(DOMPurify.sanitize(e.target.value))}
                                        placeholder='' rows={4} maxlength="2000"/>
                                </Form.Group>
                            </Col>

                            <Col sm={7} className='px-5 py-5'>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Group controlId='name'>
                                            <Form.Label className='fs-14px'>Užívateľské meno</Form.Label>
                                            <Form.Control type='text' placeholder='Enter name' value={name}
                                                onChange={(e) => setName(e.target.value)} maxlength="100"></Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={4}>
                                        <Form.Group controlId='email'>
                                            <Form.Label className='fs-14px'>Email </Form.Label>
                                            <Form.Control plaintext readOnly value={email} />
                                            <Form.Check inline type='checkbox' name='displayEmail' checked={display.email}
                                                onChange={(e) => setDisplay({ ...display, email: !display.email })} label="zobrazovať verejnosti" className='mt-2 fs-13px' />
                                        </Form.Group>
                                    </Col>

                                    <Col sm={4}>
                                        <Form.Group controlId='phoneNumber'>
                                            <Form.Label className='fs-14px'>Telefónne číslo</Form.Label>
                                            <Form.Control type='text' value={phoneNumber} pattern="^[+]*[0-9]*$"
                                                onChange={(e) => setPhoneNumber(e.target.value)} ></Form.Control>
                                            <Form.Check inline type='checkbox' name='displayPhone' checked={display.phone}
                                                onChange={(e) => setDisplay({ ...display, phone: !display.phone })} label="zobrazovať verejnosti" className='mt-2 fs-13px' />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Form.Group controlId='locality'>
                                    <Form.Label className=" form-check-inline fs-14px mr-3">Lokalita </Form.Label>
                                    <Form.Control className='form-check-inline' plaintext readOnly value={locality} style={{ width: '80%' }} />
                                </Form.Group>

                                <Form.Group controlId='marketPolicy'>
                                    <Form.Label className='fs-14px'>Podmienky predaja/kúpy/daru</Form.Label>
                                    <Form.Control as="textarea" value={marketPolicy} onChange={(e) => setMarketPolicy(DOMPurify.sanitize(e.target.value))}
                                        placeholder='' rows={4} maxlength="2000"/>
                                </Form.Group>

                                <Form.Label className='fs-14px mb-0'>Zmeniť heslo</Form.Label>
                                <Form.Text id="passwordBlock" muted className='mb-3'>Musí byť dlhé min 8 znakov a obsahovať aspoň 1 veľké písmeno, 1 malé písmeno a 1 číslo!</Form.Text>
                                {message && <Message>{message}</Message>}

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
                                               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
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

export default ProfileUpdateScreen
