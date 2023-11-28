import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    default: "user",
  },
  todo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ],
  contact: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

export const authModel = mongoose.model("User", authSchema);
