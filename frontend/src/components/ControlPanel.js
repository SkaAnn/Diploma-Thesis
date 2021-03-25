import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import SortPanelNew from './SortPanelNew'
import FilterPanel from './FilterPanel'

const ControlPanel = ({ history, keyword }) => {
    const [show, setShow] = useState(false)

    return (
        // pohyblivy div -> vonkajsi div (farba2) -> vnutorny kontajner (farba1)
        <div className="sticky-top">
            <div style={{ backgroundColor: 'rgb(12 108 184)' }}>
                <MDBContainer className='py-2 mt-3' style={{ backgroundColor: 'rgb(12 108 184)' }}>
                    <MDBRow className='my-auto' style={{ lineHeight: '2' }}>

                        <MDBCol sm='9' md='8' className='my-auto'>
                            <MDBRow>
                                <MDBCol size='12' className='my-auto' onClick={(e) => setShow(!show)} style={{ cursor: 'pointer' }} >
                                    <span className='text-uppercase fw-600 fs-15px'> Filtrovať </span>
                                </MDBCol>

                                <MDBCol size='12' className='my-auto'>
                                    <div className={`py-3 ${show ? 'd-block' : 'd-none'}`} >
                                        <FilterPanel />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>

                        <MDBCol sm='3' md='4' >

                            <MDBRow>
                                <MDBCol lg='3' className='my-auto'><span className='text-uppercase fw-600 fs-15px'>Zoradiť </span></MDBCol>
                                <MDBCol lg='9' className='fs-13px fw-500 text-uppercase'> <SortPanelNew history={history} keyword={keyword} /></MDBCol>
                            </MDBRow>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </div>

        </div >
    )
}

export default ControlPanel