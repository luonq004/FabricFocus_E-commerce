import { Router } from "express";
import {
  createComment,
  getAllComment,
  displayComment,
  deleteComment,
} from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.post("/", createComment);

commentRouter.put("/:id", displayComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.get("/", getAllComment);

export default commentRouter;
