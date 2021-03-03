import React from 'react'
import {MDBView, MDBMask} from 'mdbreact'
 
const TitleImage = () => {
    return (
        <MDBView className='title-image-view' src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg">
        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
            <h2>This Navbar is fixed</h2>
            <h5>It will always stay visible on the top, even when you scroll down</h5>
            <br />
            <p>Full page intro with background image will be always displayed in full screen mode, regardless of device </p>
        </MDBMask>
    </MDBView>
    )
}

export default TitleImage
