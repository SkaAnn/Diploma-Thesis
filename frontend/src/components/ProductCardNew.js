import React from 'react';
import { Link } from 'react-router-dom'
import {
    MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage,
    MDBCardTitle, MDBCardHeader, MDBCardFooter, MDBView, MDBMask
} from 'mdbreact';
import { Badge } from 'react-bootstrap';

const ProductCardNew = ({ product }) => {
    return (

        // border: 5px solid rgba(0,0,0,.125)
        // box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)
        <MDBCard style={{ width: "16rem" }} className='mx-auto my-3'>

            <MDBView>
                <img
                    // src="https://mdbootstrap.com/img/Others/documentation/img%20(131)-mini.jpg"
                    src="/images/sample.jpg"
                    className="mx-auto img-fluid"
                    alt=""
                    style={{ maxHeight: '10rem' }}
                />
                <MDBMask
                    // pattern={1}
                    className="flex-top mt-2 px-3">
                    <span className="badge bg-primary">Ponuka</span>
                    <span style={{ float: 'right' }} ><i className="far fa-heart fa-lg"></i></span>
                </MDBMask>
                <MDBMask
                    // pattern={1}
                    className="flex">
                    <div className="fixed-right-bottom triangle" >
                        {/* <span className='text-uppercase' style={{ zIndex: '2' }}>Novy</span> */}
                    </div>
                </MDBMask>
            </MDBView>

            <MDBCardBody className='card-pad'>
                <Link to={`/product/${product._id}`}>
                    <MDBCardTitle className='text-truncate mb-1' style={{ fontSize: '18px' }}>{product.name}</MDBCardTitle>
                </Link>
                <div className='font20'><strong>{product.price}€</strong></div>
                <div className='text-muted' style={{ fontSize: '14px' }}>{product.user.name}</div>
            </MDBCardBody>
        </MDBCard>
    )
}

export default ProductCardNew;