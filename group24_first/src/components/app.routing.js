import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login } from "../components/auth/login/login.component";
import { Register } from "../components/auth/register/register.component";
import HeaderComponent from "./common/header/header.component";
import SideBar from "./common/sidebar/sidebar.component";
import AddProduct from "./products/addProduct/addProduct.component";
import ViewProduct from "./products/viewProduct/viewProduct.component";
import { NotFound } from "./common/notFound/notFound.component";
import { EditProduct } from "./products/editProduct/editProduct.component";
import ProductDetails from "./products/productDetails/productDetails.component";
import { SearchProduct } from "./products/searchProduct/searchProduct.component";
import { ForgotPassword } from "./auth/forgotPassword/forgotPassword.component";
import { ResetPassword } from "./auth/resetPassword/resetPassword.component";
// import ChatComponent from "./common/chat/chat.component";
import Landing from "./layouts/landing.component";
import { SliderForm } from "./common/slider/sliderForm.component";
import Category from "./categories/category.component";
import Cart from "./products/cart/cart.component";
import Footer from "./../components/common/footer/footer.component";
import Checkout from "./products/cart/checkout.component";
import Details from "./common/details/details.component";

const Dashboard = (props) => {
  // console.log('localStorage in dashboard >>',localStorage.getItem('token'));
  // console.log('localStorage in dashboard >>',JSON.parse(localStorage.getItem('user')));

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Welcome to our store, plz use side nav menu or contact system
        admisnistrator for support
      </p>
    </div>
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem("token") ? (
          <div>
            {/*display sidebar navbar */}
            <div className="">
              <HeaderComponent isLoggedIn={true}></HeaderComponent>
            </div>
            <div className="side_bar">
              <SideBar />
            </div>
            <div className="main">
              <Component {...routeProps}></Component>
            </div>
          </div>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <div>
          <div className="">
            <HeaderComponent
              isLoggedIn={localStorage.getItem("token") ? true : false}
            ></HeaderComponent>
          </div>
          <div className="">
            <Component {...routeProps}></Component>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    ></Route>
  );
};

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !localStorage.getItem("token") ? (
          <div>
            <div className="">
              <HeaderComponent
                isLoggedIn={localStorage.getItem("token") ? true : false}
              ></HeaderComponent>
            </div>
            <div className="">
              <Component {...routeProps}></Component>
            </div>
          </div>
        ) : (
          <Redirect to="/dashboard"></Redirect>
        )
      }
    ></Route>
  );
};

const Routing = (props) => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />

        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <AuthRoute path="/forgot_password" component={ForgotPassword} />
        <AuthRoute path="/reset_password/:id" component={ResetPassword} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/add_product" component={AddProduct} />
        <ProtectedRoute path="/view_product" component={ViewProduct} />
        <ProtectedRoute path="/edit_product/:id" component={EditProduct} />
        {/* <ProtectedRoute path="/chat" component={ChatComponent} /> */}
        <ProtectedRoute path="/slider" component={SliderForm} />
        <ProtectedRoute path="/details" component={Details} />

        <PublicRoute path="/product_details/:id" component={ProductDetails} />
        <PublicRoute path="/category/:id" component={Category} />
        <PublicRoute path="/search_product" component={SearchProduct} />
        <PublicRoute path="/cart" component={Cart} />
        <PublicRoute path="/checkout" component={Checkout} />

        <PublicRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routing;
