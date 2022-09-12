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

export const deleteProduct = asyncHandler(async(req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if(product) {
        await product.remove();
        res.json({ message: 'Product removed' })
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export const createProduct = asyncHandler(async(req, res) => {
    const product = new ProductModel({
        name: 'Sample name',
        user: req.user._id,
        image: '/images/sample.png',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        price: 0
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async(req, res) => {
    const { name, image, price, brand, category, countInStock, description } = req.body;

    const product = await ProductModel.findById(req.params.id);

    if(product) {
        product.name = name;
        product.image = image;
        product.price = price;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.description = description;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});