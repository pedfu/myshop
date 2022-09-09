import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import UserRoutes from './routes/userRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.get('/', (req, res) => {
    res.send('Api is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`running in ${process.env.NODE_ENV} mode on port ${PORT}`));

