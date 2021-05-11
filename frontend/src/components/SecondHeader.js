import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import SortPanel from './SortPanel'
import FilterPanel from './FilterPanel'

const SecondHeader = ({ history, match, keyword }) => {
    const [show, setShow] = useState(false)

    const sortKey = match.params.sortKey
    const filter = match.params.filter

    return (
        <div className="sticky-top">
            <div style={{ backgroundColor: 'rgb(51 74 136)', color: 'white' }}>
                <MDBContainer className='py-3 mt-3'>
                    <MDBRow className='my-auto' style={{ lineHeight: '2' }}>

                        <MDBCol sm='9' md='8' className='my-auto'>
                            <MDBRow>
                                <MDBCol size='12' className='my-auto' onClick={(e) => setShow(!show)} style={{ cursor: 'pointer' }} >
                                    <span className='text-uppercase fw-600 fs-15px'> Filtrovať </span>
                                </MDBCol>

                                <MDBCol size='12' className='my-auto'>
                                    <div className={`py-3 ${show ? 'd-block' : 'd-none'}`} >
                                        <FilterPanel history={history} keyword={keyword} sortKey={sortKey ? sortKey : ''} onFilter={(val) => setShow(val)}/>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>

                        <MDBCol sm='3' md='4' >

                            <MDBRow>
                                <MDBCol lg='3' className='my-auto'><span className='text-uppercase fw-600 fs-15px'>Zoradiť </span></MDBCol>
                                <MDBCol lg='9' className='fs-13px fw-500 text-uppercase' style={{ color: 'black' }}>
                                    <SortPanel history={history} keyword={keyword} filter={filter ? filter : ''} />
                                </MDBCol>
                            </MDBRow>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div >
    )
}

export default SecondHeader