import express from "express";
import { getAllUsers, getMessages } from "../controllers/message.js";

const router = express.Router();

router.get("/user/:id", getAllUsers);
router.get("/:id/:myId", getMessages);

export default router;
