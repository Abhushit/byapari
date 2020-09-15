import React, { Component } from "react";
import SubmitButton from "../../common/submitButton/submitButton.component";
import httpClient from "../../util/httpClient";
import notify from "../../util/notify";
import { SingleProduct } from "../singleProduct/singleProduct.component";

const defaultForm = {
  name: "",
  category: "",
  brand: "",
  color: "",
  minPrice: "",
  maxPrice: "",
  fromDate: "",
  toDate: "",
  discountedItem: "",
  multipleDateRange: "",
  tags: "",
};

export class SearchProduct extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
      categories: [],
      names: [],
      searchResult: [],
      data: { ...defaultForm },
      error: { ...defaultForm },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  componentDidMount() {
    httpClient
      .POST("/product/search", {})
      .then((response) => {
        let categories = [];

        //unique categories
        response.data.forEach((product) => {
          if (categories.indexOf(product.category) === -1) {
            categories.push(product.category);
          }
        });
        this.setState({
          allProducts: response.data,
          categories,
        });
      })
      .catch((err) => {
        notify.handleError(err);
      });
  }

  buildNameOptions(selectedCategory) {
    let names = this.state.allProducts.filter(
      (product) => product.category === selectedCategory
    );
    this.setState({
      names,
    });
  }

  handleChange = (e) => {
    let { type, name, value, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
    }

    if (name === "category") {
      this.buildNameOptions(value);
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
    //search
    const { data } = this.state;
    if (!data.multipleDateRange) {
      data.toDate = data.fromDate;
    }
    httpClient
      .GET("/product/search", false, data)
      .then((response) => {
        console.log("search result is response", response);
        if (!response.data.length) {
          return notify.showInfo("No any product matched your search query");
        }
        this.setState({
          searchResult: response.data,
        });
      })
      .catch((err) => {
        notify.handleError(err);
      });
  };

  reset = () => {
    this.setState({
      searchResult: [],
    });
  };

  render() {

    console.log('props history', this.props);
    console.log('incoming data>>', this.state);

    let mainContent = this.state.searchResult.length ? (
      <>
        {/* <ViewProduct
          incomingData={this.state.searchResult}
          resetSearch={this.reset}
          history={this.props.history}
        /> */}
        <SingleProduct 
          incomingData={this.state.searchResult}
          resetSearch={this.reset}
          history={this.props.history}
        />
      </>
    ) : (
      <>
        <div className="container" style={{marginTop:90 + "px"}}>
          <h2>Search Products Here</h2>
          <form className="form-group" onSubmit={this.handleSubmit}>
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              value={this.state.data.category}
              onChange={this.handleChange}
            >
              <option value="" selected>
                (Selected Category)
              </option>
              {this.state.categories.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="error">{this.state.error.category}</p>

            {this.state.names.length && (
              <>
                <label>Name</label>
                <select
                  className="form-control"
                  name="name"
                  value={this.state.data.name}
                  onChange={this.handleChange}
                >
                  <option selected value="">
                    (Select Name)
                  </option>
                  {this.state.names.map((name, i) => (
                    <option key={i} value={name.name}>
                      {name.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brand"
              name="brand"
              value={this.state.data.brand}
              onChange={this.handleChange}
            ></input>
            <label>Min Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              name="minPrice"
              value={this.state.data.minPrice}
              onChange={this.handleChange}
            ></input>
            <label>Max Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              name="maxPrice"
              value={this.state.data.maxPrice}
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

            <label>Select Date</label>
            <input
              type="date"
              className="form-control"
              name="fromDate"
              onChange={this.handleChange}
            ></input>

            <input
              type="checkbox"
              onChange={this.handleChange}
              name="multipleDateRange"
            />
            <label>Multiple Date Range</label>
            {this.state.data.multipleDateRange && (
              <>
                <label>To Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  onChange={this.handleChange}
                ></input>
              </>
            )}
            <br />
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
            <br />
            <SubmitButton
              isSubmitting={this.props.isSubmitting}
              isValidForm={this.state.isValidForm}
            />
          </form>
        </div>
      </>
    );

    return mainContent;
  }
}
