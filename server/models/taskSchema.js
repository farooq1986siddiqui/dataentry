import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
  },
  { timestamps: true }
); // Enable timestamps

const taskSchema = mongoose.model("TaskSchema", TaskSchema);
export default taskSchema;
