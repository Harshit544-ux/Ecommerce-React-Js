import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import useRouter from "./routes/userRoutes.js";
import { cartRoutes } from "./routes/cartRoute.js";
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

connectCloudinary();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.use('/', useRouter);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(errorHandler);

export default app;
