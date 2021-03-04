import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import SortPanel from './SortPanel'

const ControlPanel = ({ history }) => {
    const [show, setShow] = useState(false)

    return (
        <div className="sticky-top">
            <div style={{ backgroundColor: 'black', textAlign: 'center', color: 'white', minHeight: '40px' }} >
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size='6' className='my-auto'>
                            Filtrovať
                            </MDBCol>
                        <MDBCol size='6' className='my-auto'>
                            <button type="button" className='btn ' onClick={(e) => setShow(!show)}
                                style={{ boxShadow: 'none', margin: '0' }}> Zoradiť </button>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol size='12' className='my-auto'>
                            <div className={`my-3 mx-5 ${show ? 'd-block' : 'd-none'}`} style={{ backgroundColor: 'white', color: 'black' }} >
                                <SortPanel history={history} />
                            </div>
                        </MDBCol>

                    </MDBRow>

                </MDBContainer>
            </div>

            <div>
                <select className="browser-default custom-select">
                    <option>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>

        </div >
    )
}

export default ControlPanel
