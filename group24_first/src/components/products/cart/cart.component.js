import React, { Component } from "react";
import { Icon } from "@iconify/react";
import plusOutlined from "@iconify/icons-ant-design/plus-outlined";
import minusOutlined from "@iconify/icons-ant-design/minus-outlined";
import closeSquareFilled from "@iconify/icons-ant-design/close-square-filled";
import checkOutlined from "@iconify/icons-ant-design/check-outlined";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  productQuantity,
  clearProduct,
  fetchProduct_ac,
} from "../../../actions/products/productActions";

const imgURL = process.env.REACT_APP_IMG_URL;

class Cart extends Component {
  componentDidMount() {
    // this.props.fetch();
    // console.log("props in cart are>>", this.props);
    // console.log('this basket>>', this.props.products);
    // this.props.fetch();
  }

  render() {
    console.log("cart in render>", this.props);

    let addedItems =
      this.props.products && this.props.products.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <td>S.No.</td>
                <td>Image</td>
                <td>Name</td>
                <td>Brand</td>
                <td>Quantity</td>
                <td>Remove ?</td>
                <td>Total</td>
              </tr>
            </thead>

            <tbody>
              {this.props.products &&
                this.props.products.length > 0 &&
                this.props.products.map(
                  (item, index) =>
                    item.inCart === true && (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          <img
                            src={`${imgURL}/${item.images[0]}`}
                            alt="product_img.jpg"
                            width="150px"
                            height="150px"
                          />
                        </td>
                        <td>{item.name}</td>

                        <td>{item.brand}</td>

                        <td>
                          <Link
                            to="/cart"
                            title="Add Items"
                            onClick={() =>
                              this.props.productQuantity("increase", item)
                            }
                          >
                            <Icon
                              icon={plusOutlined}
                              className="btn-quantity"
                            />
                          </Link>
                          {item.quantity}
                          <Link
                            to="/cart"
                            title="Substract Items"
                            onClick={() =>
                              this.props.productQuantity("decrease", item)
                            }
                          >
                            <Icon
                              icon={minusOutlined}
                              className="btn-quantity"
                            />
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn-icons"
                            title="remove"
                            onClick={() => this.props.clearProduct(item)}
                          >
                            <Icon icon={closeSquareFilled} color="red" />
                          </button>
                        </td>
                        <td>NRs. {item.price * item.quantity}</td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
          <div className="total-cart">
            <h5>Cart Total : NRs. {this.props.cartCost} /- </h5>
            <div className="checkout">
              <Link to="/checkout">
                <button className="btn-checkout">
                  <Icon icon={checkOutlined} /> Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Nothing</p>
      );

    return (
      <div className="container page-div">
        <h1>You have Ordered :</h1>
        <div className="cart-page">
          <div className="resp-cart">{addedItems}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  products: store.product.products,
  basketNumbers: store.product.basketNumbers,
  cartCost: store.product.cartCost,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchProduct_ac()),
  productQuantity: (action, name) => dispatch(productQuantity(action, name)),
  clearProduct: (name) => dispatch(clearProduct(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
