import React, { Component } from "react";
import notify from "../../util/notify";
import httpClient from "../../util/httpClient";

const imgURL = process.env.REACT_APP_IMG_URL

const defaultForm = {
  images: "",

};
export class SliderForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm,
      },
      fileUpload: [],
    };
  }

  componentDidMount() {
    console.log('state in slider form is>>',this.state);

  }

  handleChange = (e) => {
    let {type, name, value, files } = e.target;
    // console.log("files upload results are>>> ", files);
    if(type === 'file'){

    const { fileUpload } = this.state;
    fileUpload.push(...files);
    return this.setState({
      fileUpload,
    });
  }

}
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("file uploaded are>>", this.state.fileUpload);

    httpClient.UPLOAD('POST','/slider',...this.state.fileUpload)
      .then((response) => {
        notify.showSuccess("Slider Added Successfully");
      })
      .catch((err) => {
        notify.handleError(err);
      });
  };

  render() {
    // let sliderImg = this.state.fileUpload.name ?
    // <img src={`${imgURL}/${this.state.fileUpload.name}`} className="img-fluid" alt="slider" />
    // : ''

    return (
      <div className="container">
        <h2>Slider Details :</h2>
        <form
          className="form-group"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <label>Slider Image</label>
          <input
            type="file"
            name="image"
            onChange={this.handleChange}
            className="form-control"
          />
          {/* {sliderImg} */}
          
          <br />
          <button className="btn btn-primary" type="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}
