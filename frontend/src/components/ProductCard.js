import React from 'react';
import { Link } from 'react-router-dom'
import {
    MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage,
    MDBCardTitle, MDBCardHeader, MDBCardFooter
} from 'mdbreact';

const ProductCard = ({ product }) => {
    return (

        // border: 5px solid rgba(0,0,0,.125)
        // box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)
        <MDBCard style={{ width: "16rem" }} className='mx-auto my-3'>
            <MDBCardHeader>
                <MDBRow>
                    <MDBCol size="6">{product.classification}</MDBCol>
                    <MDBCol size="6" className='text-right'><i className="far fa-star" ></i></MDBCol>
                </MDBRow>
            </MDBCardHeader>

            <Link to={`/product/${product._id}`}>
                <MDBCardImage variant="top" className='mx-auto img-fluid'
                    style={{ maxHeight: '10rem' }} src="/images/sample.jpg" alt={product.name} waves />
            </Link>

            <MDBCardBody className='card-pad'>
                <Link to={`/product/${product._id}`}>
                    <MDBCardTitle className='font20 not-breaking'>{product.name}</MDBCardTitle>
                </Link>
                <MDBRow>
                    <MDBCol size="6" className='font14 my-auto'>{product.condition}</MDBCol>
                    <MDBCol size="6" className='font22 text-right'><strong>{product.price}€</strong></MDBCol>
                </MDBRow>
            </MDBCardBody>

            <MDBCardFooter>
                <MDBRow className='font14'>
                    <MDBCol size="5">
                        <Link to={`/products/user/${product.user._id}`}>
                            <i className='far fa-user'></i> {product.user.name}
                        </Link>
                    </MDBCol>
                    <MDBCol size="7" className="text-right not-breaking"><i className="far fa-clock"></i> pred tyzdnom</MDBCol>
                </MDBRow>
            </MDBCardFooter>
        </MDBCard>
    )
}

export default ProductCard;