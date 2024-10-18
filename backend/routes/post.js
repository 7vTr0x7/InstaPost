import express from "express";
import { addPost, getPosts, updatePost } from "../controllers/post";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", addPost);
router.post("/post/:postId", updatePost);
router.delete("/post/:postId");

export default router;
