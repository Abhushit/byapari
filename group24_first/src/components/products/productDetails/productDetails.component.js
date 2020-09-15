import React, { Component } from "react";
import "./productDetails.component.css";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";
import checkOutlined from "@iconify/icons-ant-design/check-outlined";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { connect } from "react-redux";
import { fetchProduct_ac, productDetails_ac } from "../../../actions/products/productActions";
const imgURL = process.env.REACT_APP_IMG_URL;

class ProductDetails extends Component {
  // constructor() {
  //   super();

  // }
  componentDidMount() {
    // this.props.fetch();

    this.productId = this.props.match.params["id"];

    this.props.productDetails(this.productId);
    // console.log('props in single products>>', this.props)
  }
  componentWillUnmount(){
    this.props.fetch()
  }

  back(){
    this.props.history.goBack();
    this.props.fetch()
  }

  render() {
    const { images } = this.props.prod;
    
    return (
      <div className="page-div">
        <div className="container">
          <div className="back-button">
            <button className="btn-back" onClick={() => this.back()}> Back</button>
          </div>
        <div className="product-details">
          <div className="row">
            <div className="col-md-6">
              <div className="productDetail-slider">
                <Carousel autoPlay={true} swipeable={true} emulateTouch={true} showThumbs={false}>
                  {images &&
                    images.map((imgs, i) => (
                      <SideBySideMagnifier
                        alwaysInPlace={true}
                        fillAvailableSpace={true}
                        key={i}
                        imageSrc={`${imgURL}/${imgs}`}
                        imgAlt="product emage"
                        className="img-detail"
                      />
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-contents">
                <div className="product-name">
                  <h3>{this.props.prod.name}</h3>
                </div>
                <div className="product-ratings">{/* product ratings */}</div>
                <div className="product-lis">
                  <ul>
                    <li>
                      Status :{" "}
                      <p className="green">{this.props.prod.status}</p>
                    </li>
                    <li className="light-line">|</li>
                    <li>
                      Weight : <p>{this.props.prod.weight}</p>
                    </li>
                  </ul>
                </div>
                <div className="product-lis">
                  <ul>
                    <li>
                      Brand : <p>{this.props.prod.brand}</p>
                    </li>
                    <li className="light-line">|</li>
                    <li>
                      Model : <p>{this.props.prod.modelNo}</p>
                    </li>
                    <li className="light-line">|</li>
                    <li>
                      Color : <p>{this.props.prod.color}</p>
                    </li>
                  </ul>
                </div>
                <div className="product-price">
                  <h2>NRs. {this.props.prod.price}</h2>
                  <div className="discount-div">
                    {/* <p>{(this.props.product.discount && this.props.product.discount.discountType == 'percentage')
                          ? <p>{this.props.product.price} - (({this.props.product.discount && this.props.product.discount.discountValue}*{this.props.product.price})/100)</p>
                          : <p>{this.props.product.price} - {this.props.product.discount && this.props.product.discount.discountValue} </p>
                    }</p> */}
                    <p>
                      {" "}
                      disount -
                      {this.props.prod.discount &&
                        this.props.prod.discount.discountValue}
                      %
                    </p>
                  </div>
                </div>
                <div className="details-buttons">
                  <div className="add-to-cart">
                    <button className="btn-cart">
                      <Icon icon={shoppingCartOutlined} /> Add to Cart
                    </button>
                  </div>
                  <div className="buy-now">
                    <button className="btn-buy">
                      <Icon icon={checkOutlined} /> Buy Now
                    </button>
                  </div>
                </div>
                <div className="product-desc">
                  <h5 className="strong">Description :</h5>
                  <p>{this.props.prod.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    );
  }
}

const mapStateToProps = (store) => ({
  isLoading: store.product.isLoading,
  prod: store.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  productDetails: (productId) => dispatch(productDetails_ac(productId)),
  fetch: () => dispatch(fetchProduct_ac())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
