import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import UserModel from './models/userModel.js';
import OrderModel from './models/orderModel.js';
import ProductModel from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

await connectDB();

const importData = async () => {
    try {
        await OrderModel.deleteMany();
        await ProductModel.deleteMany();
        await UserModel.deleteMany();

        const addedUsers = await UserModel.insertMany(users);
        const adminUser = addedUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await ProductModel.insertMany(sampleProducts);
        
        console.log(`Data imported!`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await UserModel.deleteMany();
        await OrderModel.deleteMany();
        await ProductModel.deleteMany();
        
        console.log(`Data deleted!`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}