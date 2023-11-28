import { authModel } from "../models/index.js";
import { apiResponse, hashAuth } from "../utils/index.js";

export const auth = {
  registerController: async (req, res) => {
    try {
      const reqBody = {
        ...req.body,
        password: await hashAuth.hashPassword(req.body.password),
      };
      await authModel(reqBody).save();
      const result = { message: "Registration successful" };
      return apiResponse.success(res, 201, result);
    } catch (err) {
      return apiResponse.handleDuplicateKeyError(res, err);
    }
  },

  loginController: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModel.findOne({ email });
      if (!user) return apiResponse.error(res, 404, "User not found");
      const passwordMatch = await hashAuth.passwordMatch(
        password,
        user.password
      );
      if (!passwordMatch)
        return apiResponse.error(res, 404, "Incorrect user or password");
      // jwt token creation
      const token = hashAuth.generateToken({
        userId: user._id,
        email: user.email,
      });
      const result = { message: "Login successful", token };
      return apiResponse.success(res, 200, result);
    } catch (err) {
      return apiResponse.serverError(res);
    }
  },

  getUserController: async (req, res) => {
    try {
      const result = await authModel.findById(req?.params?.userId);
      if (!result)
        return apiResponse.error(res, 404, { message: "User not found" });
      const user = {
        id: result?._id,
        email: result?.email,
        userName: result?.userName,
        todo: result?.todo,
        contacts: result?.contact,
        accountType: result?.accountType,
      };
      return apiResponse.success(res, 201, { user });
    } catch (err) {
      return apiResponse.serverError(res);
    }
  },

  deleteUserController: async (req, res) => {
    try {
      const result = await authModel.findById(req?.params?.userId);
      if (!result) {
        return apiResponse.error(res, 404, { message: "User already deleted" });
      }
      await authModel.findOneAndDelete({ _id: req?.params?.userId });
      return apiResponse.success(res, 200, {
        message: "User deleted successfully",
      });
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  },

  updateUserController: async (req, res) => {
    try {
      const result = await authModel.findById(req?.params?.userId);
      console.log(result, req.body, "User updated successfully");
      if (!result) {
        return apiResponse.error(res, 404, {
          message: "User not found or deleted",
        });
      }
      const updatedUser = await authModel.findByIdAndUpdate(
        req?.params?.userId,
        { ...req.body },
        {
          new: true,
        }
      );
      return apiResponse.success(res, 200, {
        message: "User update successfully",
        user: updatedUser,
      });
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  },
};
