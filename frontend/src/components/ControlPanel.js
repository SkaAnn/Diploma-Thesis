import React from 'react'
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact'

const ControlPanel = () => {
    return (
        <div className="sticky-top">
            <div style={{ backgroundColor: 'black', textAlign: 'center', color: 'white', height: '40px' }} >
                <MDBContainer className='height-inherit'>
                    <MDBRow className='height-inherit'>
                        <MDBCol size='6' className='my-auto'>
                            Filtrovať
                            </MDBCol>
                        <MDBCol size='6' className='my-auto'>
                            Zoradiť
                            </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    )
}

export default ControlPanel
