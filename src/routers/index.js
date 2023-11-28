import { Router } from "express";
import authRouters from "./auth/authRouters.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);

export default allRouters;
