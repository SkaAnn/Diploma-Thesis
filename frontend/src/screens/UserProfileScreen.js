import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserProfileScreen = ({ match }) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        dispatch(listUserDetails(match.params.id))
    }, [dispatch])

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (
                            <>
                                <p>{user._id}</p>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </>)}
            </Col>
            <Col md={9}>
            </Col>
        </Row>
    )
}

export default UserProfileScreen
