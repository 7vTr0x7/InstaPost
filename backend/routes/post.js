import express from "express";
import { getPosts } from "../controllers/post";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post");
router.post("/post/:postId");
router.delete("/post/:postId");

export default router;
