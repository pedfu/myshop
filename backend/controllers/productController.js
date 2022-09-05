import asyncHandler from 'express-async-handler';
import ProductModel from '../models/productModel.js';

export const getProducts = asyncHandler(async(req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
});

export const getProductById = asyncHandler(async(req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});