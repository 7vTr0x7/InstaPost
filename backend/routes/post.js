import express from "express";

const router = express.Router();

router.get("/posts");
router.post("/post");
router.post("/post/:postId");
router.delete("/post/:postId");

export default router;
