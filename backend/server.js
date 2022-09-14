import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';

import UserRoutes from './routes/userRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import UploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { allowedNodeEnvironmentFlags } from 'process';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/upload', UploadRoutes);

// mimic the __dirname, that doesnt work here because its a module type
const __dirname = path.resolve();
// makes upload folder static, so we can add resources in it
app.use('/uploads', express.static(path.join(__dirname, 'frontend/public')));

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('Api is running...');
    });
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`running in ${process.env.NODE_ENV} mode on port ${PORT}`));

