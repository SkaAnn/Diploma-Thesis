import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import SortPanel from './SortPanel'
import FilterPanel from './FilterPanel'

const ControlPanel = ({ history }) => {
    const [show, setShow] = useState(false)

    return (
        // pohyblivy div -> vonkajsi div (farba2) -> vnutorny kontajner (farba1)
        <div className="sticky-top">
            <div style={{ backgroundColor: '#f2e9e9' }}>
                <MDBContainer className='py-3 px-3' style={{ backgroundColor: '#f0d2ff' }}>
                    <MDBRow className='my-auto px-4' style={{ lineHeight: '2' }}>

                        <MDBCol sm='9' md='8' className='my-auto'>
                            <MDBRow>
                                <MDBCol size='12' className='my-auto' onClick={(e) => setShow(!show)} style={{ cursor: 'pointer' }} >
                                    Filtrovať
                                </MDBCol>

                                <MDBCol size='12' className='my-auto'>
                                    <div className={`py-3 mb-3 ${show ? 'd-block' : 'd-none'}`} >
                                        fhauifgaifryauegrfakrhaoi rfhaiurgaryuafr
                                        fhauifgaifryauegrfakrhaoi rfhaiurgaryuafr
                                        <FilterPanel />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>

                        <MDBCol sm='3' md='4' >
                            <div className='d-inline-flex width-inherit'>
                                <span className='my-auto mr-3'>Zoradiť </span>
                                <SortPanel history={history} />
                            </div>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </div>

        </div >
    )
}

export default ControlPanel
