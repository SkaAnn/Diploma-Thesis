import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
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
    const [confirmPassword, setConfirmPassword] = useState('')
    // Cannot change - profileType, locality
    const [profileType, setProfileType] = useState('')


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
            password, profileImage: imgUrl
        }

        console.log(updatedUser)
        // DISPATCH UPDATE PROFILE
        dispatch(updateUserProfile(updatedUser))
        console.log('UPDATE PROFILE')
    }

    return (
        <>
            <Link to='/user/my/profile' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='profile-image'>
                        <Form.Label>Profilová fotka</Form.Label>
                        <div>
                            <Image src={profileImage} roundedCircle fluid style={{ maxHeight: '150px' }} className='mx-auto' />
                        </div>
                        {/* <Form.Control type='text' placeholder='Enter image url' value={image}></Form.Control> */}
                        <Form.File id='image-file' label='Vyberte fotografiu' custom onChange={imageChangeHandler}></Form.File>
                        {uploading && <Loader />}
                    </Form.Group>

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
                                {/* <Form.Control type='email' placeholder='Enter email' value={email}
                            onChange={(e) => setEmail(e.target.value)} ></Form.Control> */}
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

                    <Form.Group controlId='profileInfo'>
                        <Form.Label>Informácie o {profileType && profileType === 'company' ? 'nás' : 'mne'}</Form.Label>
                        <Form.Control as="textarea" value={profileInfo} onChange={(e) => setProfileInfo(e.target.value)}
                            placeholder='' rows={3} />
                    </Form.Group>

                    <Form.Group controlId='marketPolicy'>
                        <Form.Label>Podmienky predaja/kúpy</Form.Label>
                        <Form.Control as="textarea" value={marketPolicy} onChange={(e) => setMarketPolicy(e.target.value)}
                            placeholder='' rows={3} />
                    </Form.Group>

                    {/* <Form.Group controlId='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' placeholder='Enter password' value={password}
                                            onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='confirmPassword'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type='password' placeholder='Confirn password' value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                                    </Form.Group> */}
                    
                    <button type='submit' className='my-btn-big my-3 text-uppercase' style={{ width: '100%' }}> Aktualizuj! </button>
                    {/* <Button type='submit' variant='primary'>Update</Button> */}
                </Form>
            </FormContainer>
        </>
    )
}

export default ProfileUpdateScreen
