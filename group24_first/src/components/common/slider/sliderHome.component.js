import React from 'react';
import { Carousel } from "react-responsive-carousel";

const imgURL = process.env.REACT_APP_IMG_URL;

const SliderHome = () => {
    return(
        <div className="slider-home">
            <Carousel showArrows={false} autoPlay={true} swipeable={true} emulateTouch={true}>
                <div>
                    <img src={`${imgURL}/corporate.jpg`} className="img-fluid" alt="slider" />
                </div>
                <div>
                    <img src={`${imgURL}/events.jpg`} className="img-fluid" alt="slider" />
                </div>
                <div>
                    <img src={`${imgURL}/visa.jpg`} className="img-fluid" alt="slider" />
                </div>
            </Carousel>
            <div className="container">
                <div className="header-welcome">
                    <div className="welcome-box">
                        <h1>Welcome to Byapari.com</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderHome;