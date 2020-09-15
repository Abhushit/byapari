import React, { Component } from 'react'
import httpClient from '../../util/httpClient';
import notify from '../../util/notify';
import Loader from '../../common/loader/loader.component';
import { ProductForm } from '../productForm/productForm.component';



export class EditProduct extends Component{
    constructor(){
        super();
        this.state = {
            isLoading: false,
            product: '',
        }
    }
    
    componentDidMount(){
        this.productId = this.props.match.params['id'];
        this.setState({
            isLoading: true
        })
        httpClient.GET(`/product/${this.productId}`,true)
            .then(response => {
                this.setState({
                    product: response.data,
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    update = (data,files) =>{
        // console.log('update product',data);
        httpClient.UPLOAD('PUT',`/product/${this.productId}`,data,files)
            .then(data => {
                notify.showInfo('Product Updated Successfully');
                this.props.history.push('/view_product');
            })
            .catch(err => {
                notify.handleError(err);
            })
    }

    render(){
        let content = this.state.isLoading ?
        <Loader />
        : 
        <>
            <ProductForm title="Edit Product" submitCallback={this.update} product={this.state.product} />
        </>
        return content;
    }
}