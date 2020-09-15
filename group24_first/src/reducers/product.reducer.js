import {
  SET_DELETING_ITEM,
  SET_IS_LOADING,
  PRODUCT_RECEIVED,
  PRODUCT_REMOVED,
  PRODUCT_DETAILS_LOADED,
  SET_PRODUCTID,
  ADD_PRODUCT_BASKET,
  GET_NUMBERS_BASKET,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_PRODUCT,
  LOGOUT,
} from "./../actions/products/type";
// import { productQuantity } from "../actions/products/productActions";

const initialState = {
  isLoading: false,
  productId: {},
  products: [],
  deletingItem: [],
  basketNumbers: 0,
  cartCost: 0,
  // inCart: false
};

//TODO
export const productReducer = (state = initialState, action) => {
  let productSelected = "";
  switch (action.type) {
    case ADD_PRODUCT_BASKET:
      productSelected = action.payload
      productSelected.quantity += 1;
      productSelected.inCart = true;
      // console.log("productSelected is>>", productSelected);
      
      return {
        ...state,
        ...state.products,
        basketNumbers: state.basketNumbers + 1,
        cartCost: state.cartCost + productSelected.price,
        
        // products: {
        //   ...state.products,
        //   [action.payload]: productSelected
        // }
      }

    case GET_NUMBERS_BASKET:
      return {
        ...state,
      };

    case INCREASE_QUANTITY:
      productSelected = action.payload;
      productSelected.quantity += 1;
      console.log("product selected is>>", productSelected);
      return {
        ...state,
        basketNumbers: state.basketNumbers + 1,
        cartCost: state.cartCost + productSelected.price,
      };

    case DECREASE_QUANTITY:
      let newCartCost = 0;
      productSelected = action.payload;
      let newBasketNum = 0;
      // productSelected.quantity === 0 ? productSelected.quantity = 0 : productSelected.quantity -= 1 ;
      if (productSelected.quantity === 0) {
        productSelected.quantity = 0;
        newCartCost = state.cartCost;
        newBasketNum = state.basketNumbers;
      } else {
        productSelected.quantity -= 1;
        newCartCost = state.cartCost - productSelected.price;
        newBasketNum = state.basketNumbers - 1;
      }
      // console.log('product selected is>>',productSelected)
      return {
        ...state,
        basketNumbers: newBasketNum,
        cartCost: newCartCost,
      };

    case CLEAR_PRODUCT:
      productSelected = action.payload;
      let num = productSelected.quantity;
      productSelected.quantity = 0;
      productSelected.inCart = false;
      return {
        ...state,
        basketNumbers: state.basketNumbers - num,
        cartCost: state.cartCost - num * productSelected.price,
      };

    case PRODUCT_RECEIVED:

      return {
        ...state,
        products: action.payload,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_PRODUCTID:
      return {
        ...state,
        productId: action.payload,
      };

    case SET_DELETING_ITEM:
      return {
        ...state,
        deletingItem: action.payload,
      };

    case PRODUCT_REMOVED:
      const products = state.products;
      // products.splice(action.payload, 1)
      return {
        ...state.products.splice(action.payload, 1),
        products: products,
      };

    case PRODUCT_DETAILS_LOADED:
      return {
        ...state,
        products: action.payload,
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

//the sole purpoose of reducer is to upadte store
