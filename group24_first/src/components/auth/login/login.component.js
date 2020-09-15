import React, { Component } from "react";
import { Link } from "react-router-dom";
import Notify from "./../../util/notify";
import HttpClient from "./../../util/httpClient";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        username: "",
        password: "",
      },
      error: {
        username: "",
        password: "",
      },
      remember_me: false,
      isSubmitting: false,
      isValidForm: false,
    };
    this.handleChanges = this.handleChanges.bind(this); //bind gareko
    // console.log("Constructor is first");
  }

  // componentWillMount(){
  //   console.log('Before render component will mount');
  // }

  // componentDidMount() {
  //   // console.log('check props >>', this.props)
  //   // Notify.showSuccess('Login page loaded');
  //   //self invoked block
  //   // console.log('I am component did mount');
  //   // let { chapter } = this.state;
  //   // this.interval = setInterval(() => {
  //   //   chapter++;
  //   //   this.setState({
  //   //     chapter
  //   //   })
  //   // },1000)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('prev state>>',prevState);
  //   // console.log('Once the component data is updated > props or state');
  // }

  // componentWillUnmount() {
  //   // console.log('once component is destroyed');
  //   // clearInterval(this.interval);
  //   //its purpose is to close all unfinished jobs
  // }

  handleChanges(event) {
    const { name, value } = event.target;
    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        this.validateForm(name);
      }
    );
    //State change trigger
  }

  validateForm(fieldName) {
    let errMsg = this.state.data[fieldName] ? "" : `${fieldName} is required`;
    this.setState(
      (preState) => ({
        error: {
          ...preState.error,
          [fieldName]: errMsg,
        },
      }),
      () => {
        //check form is valid
        let errors = Object.values(this.state.error).filter((error) => error);
        this.setState({
          isValidForm: errors.length === 0,
        });
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //http call
    HttpClient.POST("/auth/login", this.state.data)
      .then((response) => {
        console.log("response >>", response);
        Notify.showSuccess(`Welcome ${response.data.user.username}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        Notify.handleError(err);
      });

    // axios
    //   .post("http://localhost:9090/api/auth/login", this.state.data)
    //

    // const { chapter } = this.state;
    // chapter += 1;
    // let chapter = this.state.chapter;
    // let newChapter = chapter + 1;
    // this.setState({
    //   chapter : newChapter
    // })
    // console.log("Check state>>", this.state);
    //http with username and password
  };

  render() {
    // console.log("render at second");
    let btn = this.state.isSubmitting ? (
      <button className="btn btn-info mt-2" disabled>
        Loginin...
      </button>
    ) : (
      <button
        type="submit"
        disabled={!this.state.isValidForm}
        className="btn btn-primary mt-2"
        onClick={this.handleSubmit}
      >
        Login
      </button>
    );
    return (
      <div className="public_route page-div">
        <h2>Login</h2>
        <p>Please login to start your session</p>
        <form className="form-group form-main">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            id="username"
            name="username"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.username}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            name="password"
            onChange={this.handleChanges}
          />
          <p className="error">{this.state.error.password}</p>
          {btn}
        </form>
        {/* <p>Current Chapter : {this.state.chapter}</p> */}
        <p>Don't have an account?</p>
        <p>
          Register <Link to="/register">Here</Link>
          <span className="pull_right">
            <Link to="/forgot_password">forgot password?</Link>
          </span>
        </p>
      </div>
    );
  }
}
