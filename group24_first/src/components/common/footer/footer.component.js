import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct_ac } from "../../../actions/products/productActions";
import { Link } from "react-router-dom";
import { fetchDetails_ac } from "../../../actions/details/detailsActions";
import { Icon } from "@iconify/react";
import compassOutlined from "@iconify/icons-ant-design/compass-outlined";
import phoneOutlined from "@iconify/icons-ant-design/phone-outlined";
import mailOutlined from "@iconify/icons-ant-design/mail-outlined";
import facebookFilled from "@iconify/icons-ant-design/facebook-filled";
import instagramOutlined from "@iconify/icons-ant-design/instagram-outlined";
import twitterOutlined from "@iconify/icons-ant-design/twitter-outlined";

const imgURL = process.env.REACT_APP_IMG_URL;

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
    };
  }
  componentDidMount() {
    // this.fetchData();
    console.log("ptops in footer>>", this.props);
    this.props.fetchDetails();
    this.fetchData();

  }
  fetchData(args) {
    this.props.fetch();
  }

  handleClick = (selectedcategory) => {
    let names = this.props.products.filter(
      (pro) => pro.category === selectedcategory
    );
    this.setState({
      names,
    });
  };

  render() {
    const { products } = this.props;
    const cats =
      products && products.length > 0 && products.map((cat) => cat.category);

    const c =
      cats && cats.filter((categ, index) => cats.indexOf(categ) === index);

    // console.log("this names >>", this.state.names);

    return (
      <>
      <div className="footer-component">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="footer-item">
                <div className="footer-logo">
                  <img
                    src={`${imgURL}/logo.jpg`}
                    className="img-footer-logo"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="footer-item">
                <h5>Categories</h5>
                <ul>
                  {c &&
                    c.map((ca, i) => (
                      // <Link
                      //   to={{
                      //     pathname:`category/${ca}`,
                      //     state: {
                      //       names: this.state.names
                      //     }
                      // }}
                      //   onClick={() => this.handleClick(ca)
                      //   }
                      //   key={i}
                      // >
                      <li onClick={() => this.handleClick(ca)} key={i}>
                        <Link
                          to={{
                            pathname: `category/${ca}`,
                            state: {
                              names: this.state,
                            },
                          }}
                          onClick={() => this.handleClick(ca)}
                        >
                          >> {ca}
                        </Link>
                      </li>
                      // </Link>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="footer-item">
                <h5>Account Info</h5>

                <ul>
                  <li>
                    <Link to="/login">>> Login</Link>
                  </li>
                  <li>
                    <Link to="/register">>> Register</Link>
                  </li>
                  <li>
                    <Link to="/Cart">>> Cart</Link>
                  </li>
                  <li>
                    <Link to="/checkout">>> Checkout</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="footer-item">
                <h5>Contact Us</h5>

                {this.props.details.length > 0 &&
                  this.props.details.map((item, index) => (
                    <div key={index}>
                      <ul>
                        <li>
                          <Icon icon={compassOutlined} />{" "}
                          <span> {item.companyAddress}</span>
                        </li>
                        <li>
                          <Icon icon={phoneOutlined} />{" "}
                          <span> {item.companyPhone}</span>
                        </li>
                        <li>
                          <Icon icon={mailOutlined} />{" "}
                          <span> {item.companyEmail}</span>
                        </li>
                      </ul>
                      <div className="sm-icons">
                        <p>Follow us :</p>
                        <ul>
                          {item.fbLink && (
                            <li>
                              <a href={item.fbLink}>  
                                <Icon icon={facebookFilled} />
                              </a> 
                            </li>
                          )}
                          {item.instaLink && (
                            <li>
                              <a href={item.instaLink}>
                               <Icon icon={instagramOutlined} />
                              </a>
                            </li>
                          )}
                          {item.twitterLink && (
                            <li>
                              <a href={item.twitterLink}>
                                <Icon icon={twitterOutlined} />
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="final-footer">
        © 2020 Developed by Abhushit | All Rights Reserved
      </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  products: store.product.products,
  details: store.detail.details,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchProduct_ac()),
  fetchDetails: () => dispatch(fetchDetails_ac()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
