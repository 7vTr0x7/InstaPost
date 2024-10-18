import mongoose from "mongoose";

const InstaUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InstaUser = mongoose.model("InstaUser", InstaUserSchema);
export default InstaUser;
