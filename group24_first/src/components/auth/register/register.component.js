import React, { Component } from "react";
import { Link } from "react-router-dom";
import Notify from "./../../util/notify";
import HttpClient from './../../util/httpClient';

const DefaultForm = {
  fullname: "",
  username: "",
  password: "",
  email: "",
  phone: "",
  address: "",
  dob: "",
  gender: "",
};

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...DefaultForm,
      },
      error: {
        ...DefaultForm,
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
      case "fullname":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
        break;

      case "username":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
        break;

      case "phone":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
        break;

      case "email":
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].includes("@") &&
            this.state.data[fieldName].includes(".com")
            ? ""
            : "Invalid Email"
          : "Required Field";
        break;

      case "password":
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].length > 6
            ? ""
            : "Weak Password"
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
    this.setState({ isSubmitting: true });
    //http call
    // .then
    // .catch
    HttpClient.POST('/auth/register',this.state.data,{responseType: 'json'})
    .then((data) => {
          Notify.showSuccess("Registration Successful, Please login");
          this.props.history.push("/"); //navigate to login
        })
        .catch((err) => {
          //if we get error
          //we pass each and every error to error handling bock
          Notify.handleError(err);
          this.setState({
            isSubmitting: false,
          });
        });


    // axios
    //   .post("http://localhost:9090/api/auth/register", this.state.data, {
    //     responseType: "json",
    //   })
    //   .then((data) => {
    //     Notify.showSuccess("Registration Successful, Please login");
    //     this.props.history.push("/"); //navigate to login
    //   })
    //   .catch((err) => {
    //     //if we get error
    //     //we pass each and every error to error handling bock
    //     Notify.handleError(err);
    //     this.setState({
    //       isSubmitting: false,
    //     });
    //   });
  };

  render() {
    let btn = this.state.isSubmitting ? (
      <button disabled className="btn btn-info mt-3">
        Submitting...
      </button>
    ) : (
      <button
        type="submit"
        disabled={!this.state.isValidForm}
        className="btn btn-primary mt-3"
      >
        Submit
      </button>
    );

    return (
      <div className="page-div container pb-5">
        <h2>Register</h2>
        <p>Please register to be a new user</p>
        <form
          className="form-group form-main"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            id="fullname"
            name="fullname"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.fullname}</p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.username}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.password}</p>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            className="form-control"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.email}</p>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-control"
            onChange={this.handleChanges}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            className="form-control"
            onChange={this.handleChanges}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Address"
            id="address"
            name="address"
            className="form-control"
            onChange={this.handleChanges}
          />
          <label>Gender</label>
          <br />
          <input
            type="radio"
            id="male"
            name="gender"
            onClick={this.handleChanges}
          />
          <label htmlFor="male">Male</label> <br />
          <input
            type="radio"
            id="female"
            name="gender"
            onClick={this.handleChanges}
          />
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="others"
            name="gender"
            onClick={this.handleChanges}
          />
          <label htmlFor="others">Others</label>
          <br />
          {btn}
        </form>
        <p className="mt-3">
          Already Registered ?
          <span className="pull_right">
            Back to<Link to="/"> Login</Link>
          </span>
        </p>
      </div>
    );
  }
}
