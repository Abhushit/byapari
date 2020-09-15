import React, { Component } from "react";
import { fetchProduct_ac,addBasket } from "../../actions/products/productActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";

const imgURL = process.env.REACT_APP_IMG_URL;

class Category extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

    this.props.fetch();
  }

  render() {
    return (
      <div className="container page-div">
        <div className="products">
          <h2>{this.props.match.params.id}</h2>
          <ul>
            {this.props.products.length > 0 &&
              this.props.products.map(
                (item, index) =>
                  item.category == this.props.match.params.id && (
                    <li key={index}>
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
                  </li>
                  )
              )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  products: store.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchProduct_ac()),
  addBasket: (productName) => dispatch(addBasket(productName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
