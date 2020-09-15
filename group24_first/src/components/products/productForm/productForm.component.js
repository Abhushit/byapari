import React, { Component } from "react";
import SubmitButton from "../../common/submitButton/submitButton.component";
// import Dropzone from "react-dropzone";

const imgURL = process.env.REACT_APP_IMG_URL;

const defaultForm = {
  name: "",
  category: "",
  description: "",
  featuredProduct: '',
  brand: "",
  color: "",
  price: "",
  weight: "",
  discountedItem: "",
  discountType: "",
  discountValue: "",
  tags: "",
  images: "",
  manuDate: "",
  expiryDate: "",
  modelNo: "",
  quantity: '',
  inCart: []
};

export class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isValidForm: false,
      filesToUpload: [],
    };
  }

  componentDidMount() {
    if (this.props.product) {
      this.setState({
        data: {
          ...defaultForm,
          ...this.props.product,
          discountedItem: this.props.product.discount
            ? this.props.product.discount.discountedItem || false
            : "",
          discountType: this.props.product.discount
            ? this.props.product.discount.discountType
            : "",
          discountValue: this.props.product.discount
            ? this.props.product.discount.discountValue
            : "",
          tags: this.props.product.tags
            ? this.props.product.tags.join(",")
            : "",
        },
      });
    }
    // console.log(this.state);
    console.log("files to upload>>", this.state.filesToUpload);

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("called when either state chage or props change");
  }

  handleChange = (e) => {
    let { type, name, value, checked, files } = e.target;
    // console.log("target files", e.target);
    if (type === "checkbox") {
      value = checked;
    }

    if (type === "file") {
      const { filesToUpload } = this.state;
      // filesToUpload.map(ftu => (
      //   ftu.push(files),
      //   this.setState({
      //     ftu,
      //   })
      // ))

        filesToUpload.push(...files);
        return this.setState({
          filesToUpload,
        });

      // return this.setState({
      //   filesToUpload: [...this.state.filesToUpload, ...files]
      //   })

    }

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
      case "category":
        errMsg = this.state.data[fieldName] ? "" : "Required Field*";
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
    this.props.submitCallback(this.state.data, this.state.filesToUpload);
  };

  render() {

    // let btn = this.props.isSubmitting ? (
    //   <button disabled className="btn btn-info">
    //     submitting...
    //   </button>
    // ) : (
    //   <button
    //     disabled={!this.state.isValidForm}
    //     type="submit"
    //     className="btn btn-info"
    //   >
    //     submit
    //   </button>
    // );

    let discountContent = this.state.data.discountedItem ? (
      <>
        <label>Discount Type</label>
        <input
          type="text"
          className="form-control"
          placeholder="Discount Type"
          name="discountType"
          value={this.state.data.discountType}
          onChange={this.handleChange}
        ></input>
        <label>Discount Value</label>
        <input
          type="text"
          className="form-control"
          placeholder="Discount Value"
          name="discountValue"
          value={this.state.data.discountValue}
          onChange={this.handleChange}
        ></input>
      </>
    ) : (
      ""
    );

    let previousImage = this.state.data._id ? (
      <>
        {" "}
        <label>Previous Image</label>
        <br/>
        

        {this.state.data.images.map((image,i) => (
          <div className="prev-images" key={i}>
          <img
          src={`${imgURL}/${image}`}
          alt="Previous emage"
          width="300px"
          height="300px"
        />
        </div>

        ))}
        
      </>
    ) : (
      ""
    );

    return (
      <>
        <h2>{this.props.title}</h2>
        <form
          className="form-group"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={this.state.data.name}
            onChange={this.handleChange}
          ></input>

          <input
            type="checkbox"
            name="featuredProduct"
            value={this.state.data.featuredProduct}
            onChange={this.handleChange}
          ></input>
          <label>Featured Product</label>
          <br/>
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            value={this.state.data.description}
            onChange={this.handleChange}
          ></input>
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            name="category"
            value={this.state.data.category}
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.error.category}</p>
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brand"
            name="brand"
            value={this.state.data.brand}
            onChange={this.handleChange}
          ></input>
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={this.state.data.price}
            onChange={this.handleChange}
          ></input>
          <label>Color</label>
          <input
            type="text"
            className="form-control"
            placeholder="Color"
            name="color"
            value={this.state.data.color}
            onChange={this.handleChange}
          ></input>
          <label>Model No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Model No"
            name="modelNo"
            value={this.state.data.modelNo}
            onChange={this.handleChange}
          ></input>
          <label>Manu. Date</label>
          <input
            type="date"
            className="form-control"
            name="manuDate"
            onChange={this.handleChange}
          ></input>
          <label>Expiry Date</label>
          <input
            type="date"
            className="form-control"
            name="expiryDate"
            onChange={this.handleChange}
          ></input>
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tags"
            name="tags"
            value={this.state.data.tags}
            onChange={this.handleChange}
          ></input>
          <label>Weight</label>
          <input
            type="text"
            className="form-control"
            placeholder="Weight"
            name="weight"
            value={this.state.data.weight}
            onChange={this.handleChange}
          ></input>
          <input
            type="checkbox"
            name="discountedItem"
            checked={this.state.data.discountedItem}
            onChange={this.handleChange}
          ></input>
          <label>Discounted Item</label>
          <br></br>
          {discountContent}

          <br />
          {previousImage}

          <br />
          <br />
          {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="drop-section">
                <div {...getRootProps({
                    onChange: this.handleChange,
                }
                )}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone> */}
          <input
            type="file"
            name="image"
            onChange={this.handleChange}
            multiple
          />
          <br />
          <br />
          <SubmitButton
            isSubmitting={this.props.isSubmitting}
            isValidForm={this.state.isValidForm}
          />
        </form>
      </>
    );
  }
}
