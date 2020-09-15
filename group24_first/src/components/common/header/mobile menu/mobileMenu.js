import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import "./mobileMenu.css";
import { Icon } from "@iconify/react";
import shoppingCartOutlined from "@iconify/icons-ant-design/shopping-cart-outlined";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getNumbers,
  logout,
} from "../../../../actions/products/productActions";

class MobileMenu extends Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      // Pass on our props
      <Menu right>
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/dashboard" className="menu-item">
          Dashboard
        </Link>
        <Link to="/cart" className="menu-item">
          My Cart <Icon icon={shoppingCartOutlined} />
          <span className="cart-num">{this.props.basketNumbers}</span>
        </Link>

        <Link className=" menu-item" onClick={() => this.props.logout()}>
          Logout
        </Link>
      </Menu>
    );
  }
}

const mapStateToProps = (store) => ({
  basketNumbers: store.product.basketNumbers,
});

const mapDispatchToProps = (dispatch) => ({
  getNumbers: () => dispatch(getNumbers()),
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
