import {createStore, applyMiddleware, compose} from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

//in futurte we will add many middlewares
const middlewares = [thunk];
const initialState = {
    product: {
        products: [],
        deletingItem: [],
        isLoading: false,
        basketNumbers: 0,
        cartCost: 0,
    },
    detail: {
        details: []
    }

};

const localStorageMiddleware = ({getState}) => {
    return next => action => {
    const result = next(action);
   
        localStorage.setItem('state', JSON.stringify(getState()))
    return result;
};
    
}

const reHydrateStore = () => {
    const data = localStorage.getItem('state');
    if (data) {
        return JSON.parse(data);
    }
    return undefined;
}


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,reHydrateStore(),composeEnhancer(applyMiddleware(...middlewares,localStorageMiddleware)));
//function as an reducer
//initialState
//enhancer , middlewares

