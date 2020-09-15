import React, { Component } from "react";
import "./header.component.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";
import { connect } from "react-redux";
import {
  fetchProduct_ac,
  getNumbers,
  logout,
} from "../../../actions/products/productActions";
import MobileMenu from "./mobile menu/mobileMenu";
import MobileMenu2 from "./mobile menu/mobileMenu2";

const imgURL = process.env.REACT_APP_IMG_URL;

// const logout = (props) => {
//   //clear localstorage and then redirect to login page
//   // e.preventDefault();
//   // window.localStorage.clear();
//   // history.push("/");
//   //now we need to navigate
//   this.props.logout();
//   //this will not have route props
// };

class HeaderComponent extends Component {
  componentDidMount() {
    console.log("props in header>>", this.props);
    // this.props.fetch()
  }
  logout() {
    this.props.logout();
  }

  render() {
    let menu = this.props.isLoggedIn ? (
      <div className="container">
        <Link to="/">
          <div className="main-logo">
            <img src={`${imgURL}/logo.jpg`} className="img-logo" alt="logo" />
          </div>
        </Link>
        <ul className="nav_list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/cart">
              My Cart <Icon icon={shoppingCartOutlined} />
              <span className="cart-num">{this.props.basketNumbers}</span>
            </Link>
          </li>

          <li className="logout">
            <Link to="/">
              <button
                className="btn btn-info logout"
                onClick={() => this.props.logout()}
              >
                Logout
              </button>
            </Link>
          </li>
        </ul>

        {/* mobile menu */}
        <div id="menuId">
          <MobileMenu />
        </div>
        {/*MOBILE MENU*/}
      </div>
    ) : (
      <div className="container">
        <Link to="/">
          <div className="main-logo">
            <img src={`${imgURL}/logo.jpg`} className="img-logo" alt="logo" />
          </div>
        </Link>
        <ul className="nav_list">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/cart">
              My Cart <Icon icon={shoppingCartOutlined} />
              <span className="cart-num">{this.props.basketNumbers}</span>
            </Link>
          </li>
        </ul>
        {/* mobile menu */}
        <div id="menuId2">
          <MobileMenu2 />
        </div>
        {/*MOBILE MENU*/}
      </div>
    );
    return <div className="nav_bar">{menu}</div>;
  }
}

const mapStateToProps = (store) => ({
  basketNumbers: store.product.basketNumbers,
});

const mapDispatchToProps = (dispatch) => ({
  getNumbers: () => dispatch(getNumbers()),
  logout: () => dispatch(logout()),
  fetch: () => dispatch(fetchProduct_ac()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
