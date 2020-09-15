import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../common/loader/loader.component";
import { Icon } from "@iconify/react";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import closeSquareFilled from "@iconify/icons-ant-design/close-square-filled";
import "./viewProduct.component.css";
import DateUtil from "./../../util/dateUtil";
import {connect} from 'react-redux';
import {fetchProduct_ac, removeItem_ac} from './../../../actions/products/productActions'

const imgURL = process.env.REACT_APP_IMG_URL;

class ViewProduct extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   // isLoading: false,
  //   //   // products: [],
  //   //   deletingItem: []

  //   // };
  // }

  componentDidMount() {
    console.log('Check props now', this.props);
    // if(this.props.incomingData){
    //   return this.setState({
    //     products: this.props.incomingData
    //   }) 
    // }
    this.fetchData();
  }

  fetchData(args){
    this.props.fetch();
  }


  edit(id) {
    // console.log('history of props>>',this.props.history);
    this.props.history.push(`/edit_product/${id}`);
  }

  remove(item, index) {
    const { products } = this.props;
    products.find(product => product._id === item._id).$$isDeleting = true;
    // eslint-disable-next-line no-restricted-globals
    let confirmation = confirm("Are you sure to remove?");
    if (confirmation) {
      this.props.removeItem(item, index);
    }
  }

  render() {
    let content = this.props.isLoading ? (
      <Loader />
    ) : (
      <>
        <h2>View Products</h2>
        {this.props.incomingData && (
         <button className="btn btn-success" onClick={this.props.resetSearch}>Search Again</button>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Featured</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Created Date</th>
              <th>Created Time</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.props.products.length>0 && this.props.products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`product_details/${item._id}`}>{item.name}</Link>
                </td>
                <td>{item.featuredProduct ? 'yes' : 'no'}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{DateUtil.formateDate(item.createdAt)}</td>
                <td>{DateUtil.formateTime(item.createdAt)}</td>
                <td>
                  
                  <img
                    src={`${imgURL}/${item.images[0]}`}
                    alt="product_img.jpg"
                    width="150px"
                    height="150px"
                  />
                </td>
                <td>
                  <button
                    className="btn-icons"
                    title="edit"
                    onClick={() => this.edit(item._id)}
                  >
                    <Icon icon={editFilled} color="lightblue" />
                  </button>

                  <button
                    className="btn-icons"
                    title="delete"
                    onClick={() => this.remove(item, index)}
                  >
                    <Icon icon={closeSquareFilled} color="red" />
                  </button>
                  {item.$$isDeleting && <Loader /> }
                  {/* {this.props.deletingItem.indexOf(item._id) >= 0 && (<p>deleting...</p>)} */}
                  {/* {item.deletingItem && <Loader />} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
    return content;
  }
}

//what comes in
//the key defined here will be present in props of the component
const mapStateToProps = store => ({
  products:store.product.products,
  isLoading: store.product.isLoading,
  deletingItem: store.product.deletingItem
})


//what goes out
const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchProduct_ac()),
  removeItem: (item,index) => dispatch(removeItem_ac(item,index))
})

//when connection props are defined from mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps,mapDispatchToProps)(ViewProduct);
