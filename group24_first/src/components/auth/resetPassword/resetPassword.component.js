import React, { Component } from "react";
// import { Formik } from "formik";
import httpClient from "../../util/httpClient";
import notify from "../../util/notify";
import { Link } from "react-router-dom";
import SubmitButton from "../../common/submitButton/submitButton.component";

export class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        password: "",
        confirmPassword: "",
      },
      error: {
        password: "",
        confirmPassword: "",
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  componentDidMount() {
    this.userId = this.props.match.params["id"];
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
      case "password":
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].length > 6
            ? ""
            : "Password strength is low"
          : "Required Field";
        break;
      case "confirmPassword":
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].length > 6
            ? ""
            : "Password strength is low"
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

        // const matched =
        //   this.state.data.password === this.state.data.confirmPassword
        //     ? true
        //     : false;

        // console.log("state password is >>", matched);


        this.setState({
          isValidForm: err.length === 0,
        //   isValidForm: matched
          
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
      .POST("/auth/reset_password/"+this.userId, this.state.data)
      .then((data) => {
        notify.showSuccess("Password reset Successful, please login now");
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
      <div className="page-div container">
        <h2>Reset Password</h2>
        <p>Please choose your password</p>
        <form className="form-group form-main" onSubmit={this.handleSubmit}>
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.password}</p>
          <br />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.confirmPassword}</p>
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
