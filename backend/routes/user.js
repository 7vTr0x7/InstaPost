import express from "express";

const router = express.Router();

router.get("/user", getUser);
router.post("/user", addUser);

export default router;
