import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// auth user and get token
export const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export const getUserProfile = asyncHandler(async(req, res) => {
    const user = await UserModel.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });

    if(userExists) {
        res.status(401);
        throw new Error('User already exist');
    }

    const user = await UserModel.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});