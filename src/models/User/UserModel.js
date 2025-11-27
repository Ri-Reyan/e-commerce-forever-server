import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: [8, "Password must be at least 8 charecters"],
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { minimize: false, timestamaps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
