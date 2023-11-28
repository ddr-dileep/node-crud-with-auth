import { Router } from "express";
import { authControllers } from "../../controllers/index.js";
import { authMiddleWare } from "../../middlewares/index.js";

const authRouters = Router();

// user registration - method : POST - body : {email, password, name, userType}
authRouters.post(
  "/register",
  authMiddleWare.registerMiddleware,
  authControllers.registerController
);

// user login - method : POST - body : {email, password}
authRouters.post("/login", authControllers.loginController);

// get user details - method : get - authenticated header - token
authRouters.get(
  "/user-details",
  authMiddleWare.authenticateToken, // authentication for protected routes
  authControllers.getUserController
);

// delete user details - method : delete - authenticated header - token
authRouters.delete(
  "/delete-user",
  authMiddleWare.authenticateToken, // authentication for protected routes
  authControllers.deleteUserController
);

// update user details - method : put - authenticated header - token and all the updated body fields that need to be updated
authRouters.put(
  "/update-user",
  authMiddleWare.authenticateToken, // authentication for protected routes
  authControllers.updateUserController
);

export default authRouters;
