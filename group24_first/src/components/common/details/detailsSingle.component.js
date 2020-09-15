import React, { Component } from "react";
import "./details.component.css";
import { connect } from "react-redux";
import { fetchDetails_ac, removeDetails_ac } from "../../../actions/details/detailsActions";
import { Icon } from "@iconify/react";
import facebookFilled from "@iconify/icons-ant-design/facebook-filled";
import instagramOutlined from "@iconify/icons-ant-design/instagram-outlined";
import twitterOutlined from "@iconify/icons-ant-design/twitter-outlined";
import closeSquareFilled from "@iconify/icons-ant-design/close-square-filled";

class DetailsSingle extends Component {
  componentDidMount() {
    this.props.fetchDetails();
    console.log("props in details single>>", this.props);
  }



  render() {
    return (
      <div className="page-div">
        <h3>Company Detail:</h3>
        {this.props.details.length > 0 &&
          this.props.details.map((item, i) => (
            <div className="detailSingle" key={i}>
              <p>
                Company Address is => <span>{item.companyAddress}</span>{" "}
              </p>
              <p>
                Company PhoneNumber is => <span>{item.companyPhone}</span>
              </p>
              <p>
                Company Email is => <span>{item.companyEmail}</span>
              </p>
              {item.fbLink && (
                <p>
                  <Icon icon={facebookFilled} /> => <span> {item.fbLink}</span>
                </p>
              )}
              {item.instaLink && (
                <p>
                  <Icon icon={instagramOutlined} /> =>{" "}
                  <span>{item.instaLink}</span>
                </p>
              )}
              {item.twitterLink && (
                <p>
                  <Icon icon={twitterOutlined} /> =>{" "}
                  <span>{item.twitterLink}</span>
                </p>
              )}
              <button className="btn-icons" title="remove" onClick={() => this.props.removeDetails(item)}>
                <Icon icon={closeSquareFilled} color="red" />
              </button>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  details: store.detail.details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDetails: () => dispatch(fetchDetails_ac()),
  removeDetails: (item) => dispatch(removeDetails_ac(item))

});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSingle);
