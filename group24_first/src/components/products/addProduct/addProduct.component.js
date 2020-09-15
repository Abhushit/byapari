import React, { Component } from "react";
import { ProductForm } from "../productForm/productForm.component";
import httpClient from "../../util/httpClient";
import notify from "../../util/notify";



export default class AddProduct extends Component {
    
    constructor() {
        super();
        this.state = {
            isSubmitting: false
        };
    }
    

    add = (data,files) => {

        this.setState({
            isSubmitting: true
        })
        httpClient.UPLOAD('POST','/product', data, files)
            .then(response => {
                this.props.history.push('/view_product')
                notify.showInfo("Product Added Successfully")
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                })
            })

    }
    render() {
        return (
            <ProductForm title="Add Product" submitCallback={this.add} isSubmitting={this.props.isSubmitting} ></ProductForm>
        )

  }
}

