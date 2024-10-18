import express from "express";
import {
  addMultiPost,
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", addPost);
router.post("/post/multiple", addMultiPost);
router.post("/post/:postId", updatePost);
router.delete("/post/:postId", deletePost);

export default router;
