import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productDestailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDestailsReducer,
    cart: cartReducer
});
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    }
};

// Instead of passing only thunk, you can pass others middlewares
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;