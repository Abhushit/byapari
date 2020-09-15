import {combineReducers} from 'redux';
import { productReducer } from './product.reducer';
import { detailsReducer } from './details.reducer';

export const rootReducer = combineReducers({
    product: productReducer,
    detail: detailsReducer
})