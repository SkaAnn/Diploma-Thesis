import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// https://www.npmjs.com/package/react-responsive-carousel
const ImageCarousel = ({ images }) => {
    return (
        <Carousel>

            {images && images.map((url) => (
                <div>
                    <img src={url} key={url}/>
                    <p className="legend">{url}</p>
                </div>
            ))}

        </Carousel>
    );

}

export default ImageCarousel

