import mongoose from "mongoose";

const InstaPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstaUser",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const InstaPost = mongoose.model("InstaPost", InstaPostSchema);
export default InstaPost;
