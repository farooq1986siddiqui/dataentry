import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    // validate:[isEmail,"Please enter valid email"]
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate:[isEmail,"Please enter valid email"]
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.model("userSchema", UserSchema);
export default userSchema;
