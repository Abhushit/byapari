import {
  SET_IS_LOADING,
  SET_DELETING_ITEM,
  PRODUCT_RECEIVED,
  PRODUCT_REMOVED,
  PRODUCT_DETAILS_LOADED,
  ADD_PRODUCT_BASKET,
  GET_NUMBERS_BASKET,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_PRODUCT,
  LOGOUT,
} from "./type";
import httpClient from "./../../components/util/httpClient";
import notify from "./../../components/util/notify";

// function fetchProduct_ac(params){
//     return function(dispatch){
//         //calling a dispatch will execute reducer
//     }
// }

export const fetchProduct_ac = (params) => (dispatch) => {
  console.log("At Actions from view >>", params);
  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });
  httpClient
    .GET("/product", true)
    .then((response) => {
      response.data.forEach((item) => {
        item.$$isDeleting = false;
      });
      //dispatch action to reducer
      console.log(
        "there is a delay with http call now dispatch actin to reducer"
      );
      dispatch({
        type: PRODUCT_RECEIVED,
        payload: response.data,
      });
    })
    .catch((err) => {
      notify.handleError(err);
    })
    .finally(() => {
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
    });
};

export const removeItem_ac = (item, index) => (dispatch) => {
  dispatch({
    type: SET_DELETING_ITEM,
    payload: item._id,
  });

  httpClient
    .DELETE(`/product/${item._id}`, true)
    .then((response) => {
      notify.showInfo("Product Removed");
      dispatch({
        type: PRODUCT_REMOVED,
        payload: index,
      });
    })
    .catch((err) => {
      notify.handleError(err);
    });
};

export const productDetails_ac = (productId) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });
  httpClient
    .GET(`/product/${productId}`, true)
    .then((response) => {
      dispatch({
        type: PRODUCT_DETAILS_LOADED,
        payload: response.data,
      });
    })
    .catch((err) => {
      notify.handleError(err);
    })
    .finally(() => {
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
    });
};

export const addBasket = (productName) => (dispatch) => {
  console.log("Adding to basket");
  console.log("Product:", productName);

  dispatch({
    type: ADD_PRODUCT_BASKET,
    payload: productName,
  });
};

export const getNumbers = () => (dispatch) => {
  console.log("get numbers in basket");
  dispatch({
    type: GET_NUMBERS_BASKET,
  });
};

export const productQuantity = (action, name) => (dispatch) => {
  // console.log('Inside Product Quantity');
  // console.log('action is', action);
  // console.log('product name is', name);
  dispatch({
    type: action === "increase" ? INCREASE_QUANTITY : DECREASE_QUANTITY,
    payload: name,
  });
};

export const clearProduct = (name) => (dispatch) => {
  // console.log('Inside clear product');
  // console.log('product name on clear', name)
  dispatch({
    type: CLEAR_PRODUCT,
    payload: name,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
