import React, { Component } from "react";
// import { Formik } from "formik";
import httpClient from "../../util/httpClient";
import notify from "../../util/notify";
import { Link } from "react-router-dom";
import SubmitButton from "../../common/submitButton/submitButton.component";

export class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
      },
      error: {
        email: "",
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  handleChanges = (event) => {
    const { name, value } = event.target;
    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        // console.log("callback part of setstate >>", this.state);
        //form validation
        this.validateForm(name);
      }
    );
  };

  validateForm(fieldName) {
    let errMsg;
    switch (fieldName) {
      case "email":
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].includes("@") &&
            this.state.data[fieldName].includes(".com")
            ? ""
            : "Invalid Email"
          : "Required Field";
        break;

      default:
        break;
    }
    this.setState(
      (preState) => ({
        error: {
          ...preState.error,
          [fieldName]: errMsg,
        },
      }),
      () => {
        //now disable submit button when form is invalid

        const { error } = this.state;
        let err = Object.values(error).filter((item) => item);

        this.setState({
          isValidForm: err.length === 0,
        });
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });
    httpClient
      .POST("/auth/forgot_password", this.state.data)
      .then((data) => {
        notify.showInfo(
          "Password reset link sent to your email, please check your inbox"
        );
        this.props.history.push("/");
      })
      .catch((err) => {
        notify.handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  render() {
    return (
      <div className="public_route page-div">
        <h2>Forgot Password</h2>
        <p>Please provide your email address to reset your password</p>
        <form className="form-group form-main" onSubmit={this.handleSubmit}>
          <br/>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.email}</p>
          <br />
          <SubmitButton
            isSubmitting={this.props.isSubmitting}
            isValidForm={this.state.isValidForm}
          />
        </form>
        <div className="pull_right">
          Back to<Link to="/"> Login</Link>
        </div>
      </div>
    );
  }
}
