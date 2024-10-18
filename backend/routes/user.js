import express from "express";
import { addUser, getUser } from "../controllers/user";

const router = express.Router();

router.get("/user/:userId", getUser);
router.post("/user", addUser);

export default router;
