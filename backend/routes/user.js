import express from "express";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/user/:userId", getUser);
router.post("/user", addUser);

export default router;
