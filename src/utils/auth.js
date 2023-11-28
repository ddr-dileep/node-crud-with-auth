import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashAuth = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSaltSync(11);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  },

  passwordMatch: async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  },

  generateToken: (payload) => {
    return jwt.sign(payload, process.env.MY_SECURITY_TOKEN_KEY, {
      expiresIn: "21d",
    });
  },

  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.MY_SECURITY_TOKEN_KEY);
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
