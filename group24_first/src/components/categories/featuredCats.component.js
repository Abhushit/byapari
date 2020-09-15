import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct_ac, addBasket } from "./../../actions/products/productActions";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const imgURL = process.env.REACT_APP_IMG_URL;

class FeaturedCats extends Component {
  componentDidMount() {
    // console.log('products in state', this.state);
    // console.log('products in props', this.props);
    // this.props.fetch();
  }
  render() {
    var settings = {
      dots: false,
      arrows: true,
      autoplay: 400,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }]
    };
    return (
      <div className="featured-products">
        <h2>Featured Products</h2>
        <Slider {...settings}>
          {this.props.products &&
            this.props.products.length > 0 &&
            this.props.products.map(
              (item, index) =>
                item.featuredProduct === true && (
                  <div key={index}>
                    <div className="single-product">
                      <Link to={`product_details/${item._id}`}>
                        <div className="item-image">
                          <div className="product-image">
                            <img
                              src={`${imgURL}/${item.images[0]}`}
                              className="img-product"
                              alt="product pictures"
                            />
                          </div>
                          <div className="overlay">view</div>
                        </div>
                      </Link>
                      <div className="item-desc">
                        <Link to={`product_details/${item._id}`}>
                          <div className="product-name">{item.name}</div>
                          <div className="item-price">NRs. {item.price}</div>
                        </Link>
                        {item.discount && (
                          <div className="item-discount">
                            <p>
                              ({item.discount && item.discount.discountValue}%
                              off)
                            </p>
                          </div>
                        )}
                        <div className="item-add-to-cart">
                          <button
                            className="btn-cart-item"
                            onClick={() => this.props.addBasket(item)}
                          >
                            <Icon icon={shoppingCartOutlined} /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </Slider>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  products: store.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  // fetch: () => dispatch(fetchProduct_ac()),
  addBasket: (productName) => dispatch(addBasket(productName)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedCats);
