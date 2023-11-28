import { Router } from "express";
import authRouters from "./authRouters.js";
import contactRouters from "./contactRouters.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);
allRouters.use("/contact", contactRouters);

export default allRouters;
