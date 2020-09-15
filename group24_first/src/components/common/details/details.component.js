import React, { Component } from "react";
import httpClient from "../../util/httpClient";
import notify from "../../util/notify";
import SubmitButton from "../submitButton/submitButton.component";
import DetailsSingle from "./detailsSingle.component";
import { connect } from "react-redux";
import { fetchDetails_ac } from "../../../actions/details/detailsActions";

const defaultForm = {
  companyPhone: "",
  companyAddress: "",
  companyEmail: "",
  fbLink: "",
  instaLink: "",
  twitterLink: "",
};

class Details extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isSubmitting: false,
      isValidForm: false,
      showComponent: false
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        ...defaultForm,
      },
    });
  }

  handleChange = (e) => {
    let { name, value } = e.target;
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
  };

  validateForm(fieldName) {
    let errMsg;
    switch (fieldName) {
      case "companyEmail":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
        break;
      case "companyAddress":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
        break;
      case "companyPhone":
        errMsg = this.state.data[fieldName] ? "" : "Required Field";
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
        let errors = Object.values(this.state.error).filter((err) => err);
        this.setState({
          isValidForm: errors.length === 0,
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
      .POST("/details", this.state.data)
      .then((response) => {
        notify.showInfo("Details Added");
        window.location.reload(false);
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        this.setState({
          isSubmitting: false,
        });
      });
  };

  render() {
    console.log('is valid foprm>>', this.state.isValidForm);
    let btn = this.state.isSubmitting ? (
      <button disabled className="btn btn-info">
        submitting...
      </button>
    ) : (
      <button
        disabled={!this.state.isValidForm}
        type="submit"
        className="btn btn-info"
      >
        submit
      </button>
    );

    let detailHere = this.props.fetchDetails ? (
      <div className="com-details">
        <DetailsSingle />
      </div>
    ) : (
      ""
    );

    return (
      <div className="container page-div">
        <h1>Details :</h1>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>Company Address</label>
          <input
            type="text"
            className="form-control"
            name="companyAddress"
            placeholder="Enter Company's Address"
            value={this.state.data.companyAddress}
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.companyAddress}</p>
          <label>Company Phone Number</label>
          <input
            type="number"
            className="form-control"
            name="companyPhone"
            placeholder="Enter Company's Phone Number"
            value={this.state.data.companyPhone}
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.companyPhone}</p>

          <label>Company Email</label>
          <input
            type="text"
            className="form-control"
            name="companyEmail"
            placeholder="Enter Company's Email"
            value={this.state.data.companyEmail}
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.companyEmail}</p>

          <label>Facebook Link</label>
          <input
            type="text"
            className="form-control"
            name="fbLink"
            placeholder="Facebook Link"
            value={this.state.data.fbLink}
            onChange={this.handleChange}
          />
          <label>Instagram Link</label>
          <input
            type="text"
            className="form-control"
            name="instaLink"
            placeholder="Instagram Link"
            value={this.state.data.instaLink}
            onChange={this.handleChange}
          />
          <label>Twitter Link</label>
          <input
            type="text"
            className="form-control"
            name="twitterLink"
            placeholder="Twitter Link"
            value={this.state.data.twitterLink}
            onChange={this.handleChange}
          />
          {btn}
        </form>
        <div>
          {detailHere}
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDetails: () => dispatch(fetchDetails_ac()),
});

export default connect(null, mapDispatchToProps)(Details);
