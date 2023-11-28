import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { database } from './config/index.js';
import allRouters from './routers/index.js';

const APP = express();

// middlewares
dotenv.config();
APP.use(express.json());
APP.use(cors());

// database configuration
database();

// all routes
APP.use('/api', allRouters);

export default APP;
