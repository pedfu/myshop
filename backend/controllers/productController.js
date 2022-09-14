import asyncHandler from 'express-async-handler';
import ProductModel from '../models/productModel.js';

export const getProducts = asyncHandler(async(req, res) => {
    // how many product per page
    const pageSize = 10;
    // current page
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await ProductModel.countDocuments({...keyword});
    const products = await ProductModel.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

export const createProductReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body;

    const product = await ProductModel.findById(req.params.id);
    if(product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        }
        
        product.reviews.push(review);

        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added'});
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export const getTopProducts = asyncHandler(async(req, res) => {
    // rating decrescente
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
});