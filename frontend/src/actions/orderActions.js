import { ORDERS_LIST_USER_FAIL, ORDERS_LIST_USER_REQUEST, ORDERS_LIST_USER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/orderConstants';
import { CART_RESET } from '../constants/cartConstants';
import axios from 'axios';

export const createOrder = (order) => async(dispatch, getStore) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { userLogin: { userInfo }} = getStore();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({ type: CART_RESET });
        localStorage.setItem('cartItems', []);
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getStore) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo }} = getStore();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getStore) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        });

        const { userLogin: { userInfo }} = getStore();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        console.log(data);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUserOrders = () => async(dispatch, getStore) => {
    try {
        dispatch({
            type: ORDERS_LIST_USER_REQUEST
        });

        const { userLogin: { userInfo }} = getStore();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/orders/myorders`, config);

        dispatch({
            type: ORDERS_LIST_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDERS_LIST_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}