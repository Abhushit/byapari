import React, {useEffect} from "react";
import SliderHome from "../common/slider/sliderHome.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyChoose from "./whyChoose.component";
import FeaturedCats from "./../categories/featuredCats.component";
import ComputerCats from "./../categories/computerCats.component";
import MobileCats from "./../categories/mobileCats.component";
import { connect } from "react-redux";
import { fetchProduct_ac } from "../../actions/products/productActions";


// const imgURL = process.env.REACT_APP_IMG_URL;

const Landing = (props) => {
   const { fetch } = props
    // useEffect(() => {
    //     fetch()
    // }, [])
    return (
      <div id="homeId">
        <SliderHome />
        <div className="container">
          {/* Featured Products */}
          <FeaturedCats />

          {/* Computer Accessories */}
          <ComputerCats />

          {/* MOBILE ACCESSORIES */}
          <MobileCats />
        </div>
        <WhyChoose />
      </div>
    );
  }


const mapDispatchToProps = (dispatch) => ({
  // fetch: () => dispatch(fetchProduct_ac()),
});

export default connect(null, mapDispatchToProps)(Landing);
