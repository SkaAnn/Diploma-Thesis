import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// https://www.npmjs.com/package/react-responsive-carousel
const ImageCarousel = ({ images }) => {
    return (
        <Carousel>
            {(images && images.length !== 0) ?
                images.map((url) => (
                    <div className='carousel-div-size' key={url} style={{ backgroundColor: 'gainsboro' }}>
                        <img className='img-fluid carousel-center-img carousel-img-size' src={url} alt={url} />
                    </div>
                ))
                : <div className='carousel-div-size' style={{ backgroundColor: 'gainsboro' }}>
                    <img className='img-fluid carousel-center-img carousel-img-size' src={'/images/bez-fotky.jpg'} alt={'no-photo'} />
                </div>
            }
        </Carousel>
    );
}

export default ImageCarousel

