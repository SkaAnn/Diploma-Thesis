import React from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap'

const UserInfoPanel = ({ user }) => {
    return (

        <ListGroup variant='flush'>
            <ListGroup.Item key='1' className='text-center' style={{backgroundColor: 'rgb(255 214 95)', padding: '30px'}}>
                {/* <Image src={user.profileImage} roundedCircle fluid
                    style={{ maxHeight: '130px' }} className='mx-auto' /> */}
                    <img src={user.profileImage} alt='profilePhoto'  className='profile-pic mx-auto' />
            </ListGroup.Item>
            <ListGroup.Item key='2'>
                <Row className='fs-14px lh-2'>
                    {/* name a locality povinne */}
                    <Col className='col-12'> <i className="far fa-id-card fa-fw mr-1"></i> <strong> {user.name} </strong> </Col>
                    
                    {user.display && user.display.email && <Col className='col-12'> <i className="fas fa-at fa-fw mr-1"></i> {user.email} </Col>}
                    {user.display && user.display.phone && <Col className='col-12'> <i className="fas fa-mobile fa-fw mr-1"></i> {user.phoneNumber} </Col> }
                    <Col className='col-12'> <i className="fas fa-map-marker-alt fa-fw mr-1"></i> {user.locality} </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item key='4'>
                <h6 className='fw-600'>Niečo o {user.profileType === "company" ? 'nás' : 'mne'}</h6>
                <div className='fs-13px text-justify'>{user.profileInfo} </div>
            </ListGroup.Item>
            <ListGroup.Item key='5'>
                <h6 className='fw-600'>Podmienky</h6>
                <div className='fs-13px text-justify'>{user.marketPolicy} </div>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default UserInfoPanel
