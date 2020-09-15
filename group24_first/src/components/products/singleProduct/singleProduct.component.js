import React, { Component } from "react";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";

const imgURL = process.env.REACT_APP_IMG_URL;

export class SingleProduct extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // console.log('props maybe herre>>',this.props);
    if (this.props.incomingData) {
      return this.setState({
        products: this.props.incomingData,
      });
    }
  }

  render() {
    console.log("props in single component >>", this.props);
    let searchBtn = this.props.incomingData ? (
      <button className="btn btn-info" onClick={this.props.resetSearch}>
        Search Again
      </button>
    ) : (
      ""
    );

    return (
      <div className="container search-results">
        {searchBtn}
        <h2>Search Results :</h2>
        <div className="row">
          {this.props.incomingData &&
            this.props.incomingData.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="single-product">
                  <div className="item-image">
                    <div className="product-image">
                      <img
                        src={`${imgURL}/${item.images[0]}`}
                        className="img-fluid"
                        alt="product pictures"
                      />
                    </div>
                    <div className="overlay">view</div>
                  </div>

                  <div className="item-desc">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">NRs. {item.price}</div>
                    <div className="item-discount">
                      <p>
                        ({item.discount && item.discount.discountValue}% off)
                      </p>
                    </div>
                    <div className="item-add-to-cart">
                      <button className="btn-cart-item">
                        <Icon icon={shoppingCartOutlined} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
