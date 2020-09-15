import React, { Component } from "react";
import { connect } from "react-redux";
import {
  productQuantity,
  clearProduct,
} from "../../../actions/products/productActions";
import { Icon } from "@iconify/react";
import closeSquareFilled from "@iconify/icons-ant-design/close-square-filled";
import WhyChoose from "../../layouts/whyChoose.component";

const imgURL = process.env.REACT_APP_IMG_URL;

class Checkout extends Component {
  render() {
    return (
      <>
        <div className="container page-div">
          <h1>Checkout </h1>
          <div className="check-form">
            <div className="grid-1-2">
              <div className="checkout-products">
                <h3>Cart Details :</h3>

                <ol>
                  {this.props.products &&
                    this.props.products.map(
                      (item, index) =>
                        item.inCart === true && (
                          <li key={index}>
                            <div className="">
                              <div className="grid-2">
                                <div className="check-images">
                                  <img
                                    src={`${imgURL}/${item.images[0]}`}
                                    alt="product_img.jpg"
                                    width="150px"
                                    height="150px"
                                  />
                                </div>
                                <div className="check-namepro">
                                  <p>{item.name} * {item.quantity} </p>
                                  <p className="check-price">
                                    NRs. {item.price * item.quantity}
                                  </p>
                                  <button
                                    className="btn-icons"
                                    title="remove"
                                    onClick={() =>
                                      this.props.clearProduct(item)
                                    }
                                  >
                                    <Icon
                                      icon={closeSquareFilled}
                                      color="red"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                    )}
                </ol>

                <div className="total-cart">
                  <h5>Cart Total : NRs. {this.props.cartCost} /- </h5>
                </div>
              </div>
              <div className="checkout-form">
                <form className="form-group">
                  <label>Person Name</label>
                  <input
                    type="text"
                    name="personName"
                    className="form-control"
                    placeholder="Enter your Full Name"
                  />
                  <label>Person Address</label>
                  <input
                    type="text"
                    name="personAddress"
                    className="form-control"
                    placeholder="Enter your Address"
                  />
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="personNumber"
                    className="form-control"
                    placeholder="Enter your Phone Number"
                  />
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="personEmail"
                    className="form-control"
                    placeholder="Enter your Email Address"
                  />
                  <input type="radio" value="payViaCard" name="payment"/>
                  <label className="ml-2">pay via card</label> <br />
                  <input type="radio" value="payOnDelivery" name="payment" />
                  <label className="ml-2">pay on delivery</label> <br />
                  <button className="btn-submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          <WhyChoose />
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  products: store.product.products,
  cartCost: store.product.cartCost,
});

const mapDispatchToProps = (dispatch) => ({
  productQuantity: (action, name) => dispatch(productQuantity(action, name)),
  clearProduct: (name) => dispatch(clearProduct(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
