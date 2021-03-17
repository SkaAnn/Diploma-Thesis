import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// https://www.npmjs.com/package/react-responsive-carousel
const ImageCarousel = ({ images }) => {
    return (
        <Carousel>

            {images && images.map((url) => (
                <div className='carousel-div-size' key={url} style={{backgroundColor: 'gainsboro'}}>

                    <img className='img-fluid carousel-center-img carousel-img-size' src={url} alt={url} />
                    {/* <p className="legend">{url}</p> */}
                </div>
            ))}

        </Carousel>
    );

}

export default ImageCarousel

