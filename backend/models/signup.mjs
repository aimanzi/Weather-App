import mongoose from "mongoose";
import { type } from "os";

const SignUpSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },

  mail: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.model("userData", SignUpSchema);
